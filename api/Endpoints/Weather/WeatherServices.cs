using System.Security.Claims;
using System.Text.Json;
using api.Data;
using api.Endpoints.Weather.RequestResponse.NoaaTemperature;
using api.Endpoints.Weather.RequestResponse.NoaaWater;
using api.Endpoints.Weather.RequestResponse.NoaaWind;
using api.Endpoints.Weather.RequestResponse.NdbcWaves;
using NRedisStack;
using NRedisStack.RedisStackCommands;
using StackExchange.Redis;

namespace api.Endpoints.Weather;

public class WeatherServices : BaseService
{
    private readonly IDatabase _redisDatabase;
    private readonly JsonSerializerOptions _jsonOptions;

    public WeatherServices(
    LakeTrackerContext context,
    IConnectionMultiplexer redis,
    ILogger<WeatherServices> logger,
    ClaimsPrincipal principal,
    IConfiguration config)
    : base(context, redis, logger, principal, config)
    {
        _redisDatabase = redis.GetDatabase();
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = false
        };
    }
    private string stationId = "9063063";
    
    public async Task<Domain.Weather?> GetWeatherFromCache()
    {
        var key = $"weather:{stationId}";
        var cachedWeather = await _redisDatabase.StringGetAsync(key);
        if (cachedWeather.IsNullOrEmpty)
        {
            Logger.LogInformation("No cached weather data found.");
            return null;
        }
        var weather = JsonSerializer.Deserialize<Domain.Weather>(cachedWeather.ToString(), _jsonOptions);
        return weather;
    }

    public async Task<ICollection<Domain.Weather>> GetWeather()
    {
        
        var cachedWeather = await GetWeatherFromCache();
        if (cachedWeather != null)
        {
            Logger.LogInformation("Returning cached weather data.");
            return new List<Domain.Weather> { cachedWeather };
        }
        
        var NOAAWeatherClient = new HttpClient();
        NOAAWeatherClient.BaseAddress = new Uri("https://api.tidesandcurrents.noaa.gov/api/prod/datagetter/");
        var NDBCWeatherClient = new HttpClient();
        NDBCWeatherClient.BaseAddress = new Uri("https://www.ndbc.noaa.gov/data/realtime2/");

        var waterRequest = await NOAAWeatherClient.GetAsync(
            "?date=today&station=9063063&product=water_temperature&time_zone=LST_LDT&interval=h&units=english&application=DataAPI_Sample&format=json");
        
        if (!waterRequest.IsSuccessStatusCode)
        {
            Logger.LogError("Failed to fetch water data from NOAA API.");
            return null;
        }
        
        var windRequest = await NOAAWeatherClient.GetAsync(
            "?date=today&station=9063063&product=wind&time_zone=LST_LDT&interval=h&units=english&application=DataAPI_Sample&format=json");
        
        if (!windRequest.IsSuccessStatusCode)
        {
            Logger.LogError("Failed to fetch wind data from NOAA API.");
            return null;
        }
        
        var temperatureRequest = await NOAAWeatherClient.GetAsync(
            "?date=today&station=9063063&product=air_temperature&time_zone=LST_LDT&interval=h&units=english&application=DataAPI_Sample&format=json");
        
        if (!temperatureRequest.IsSuccessStatusCode)
        {
            Logger.LogError("Failed to fetch air temperature data from NOAA API.");
            return null;
        }

        var wavesRequest = await NDBCWeatherClient.GetAsync(
            "45005.txt");
        
        if (!wavesRequest.IsSuccessStatusCode)
        {
            Logger.LogError("Failed to fetch air wave data from NDBC API.");
            return null;
        }
        
        var waterJson = await waterRequest.Content.ReadFromJsonAsync<NoaaWeatherResponseWater>();
        var waterData = waterJson.Data.ToList();
        var windJson = await windRequest.Content.ReadFromJsonAsync<NoaaWeatherResponseWind>();
        var windData = windJson.Data.ToList();
        var temperatureJson = await temperatureRequest.Content.ReadFromJsonAsync<NoaaWeatherResponseTemperature>();
        var temperatureData = temperatureJson.Data.ToList();
        var allWaves = NdbcWaveParser.ParseAllValid(wavesRequest.Content.ReadAsStringAsync().Result);

        var weatherData = new List<Domain.Weather>();

        for (int i = waterData.Count - 1; i >= 0; i--)
        {
            if (i >= windData.Count || i >= temperatureData.Count)
            {
                Logger.LogWarning("Data mismatch: Not enough wind or temperature data for the water data available.");
                break;
            }
            var water = waterData[i];
            var wind = windData[i];
            var temperature = temperatureData[i];
            var waveWVHT = allWaves
                .Where(w => w.WaveHeight > 0 && w.Timestamp <= water.Time)
                .FirstOrDefault();
            var waveDPD = allWaves
                .Where(w => w.DominantWavePeriod > 0 && w.Timestamp <= water.Time)
                .FirstOrDefault();

            Console.WriteLine($"Time for water: {water.Time}, wind: {wind.Time}, temperature: {temperature.Time}, waves: {waveWVHT?.Timestamp}, {waveDPD?.Timestamp}");

            if (water.Time - temperature.Time > TimeSpan.FromHours(1) || water.Time - wind.Time > TimeSpan.FromHours(1))
            {
                Logger.LogError("Data mismatch: Water, wind, and temperature data timestamps do not align.");
                return null;
            }
            weatherData.Add(new Domain.Weather
            {
                Time = wind.Time,
                AirTemperature = temperature.Value,
                WaterTemperature = water.Value,
                WindSpeed = wind.Speed,
                WindDirection = wind.Direction,
                WindDirectionReadable = wind.DirectionReadable,
                GustSpeed = wind.Gust,
                WaveHeight = waveWVHT?.WaveHeight ?? 0,
                DominantWavePeriod = waveDPD?.DominantWavePeriod ?? 0,
            });
        }

        var weather = weatherData.FirstOrDefault() ?? throw new Exception("No data");
        var key = $"weather:{weather.Station}";
        var serialized = JsonSerializer.Serialize(weather, _jsonOptions);
        await _redisDatabase.StringSetAsync(key, serialized, TimeSpan.FromMinutes(60));

        return weatherData;
    }
}