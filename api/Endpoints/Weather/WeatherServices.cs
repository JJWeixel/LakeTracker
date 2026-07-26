using System.Security.Claims;
using api.Data;
using api.Endpoints.Weather.RequestResponse.NoaaTemperature;
using api.Endpoints.Weather.RequestResponse.NoaaWater;
using api.Endpoints.Weather.RequestResponse.NoaaWind;
using StackExchange.Redis;

namespace api.Endpoints.Weather;

public class WeatherServices : BaseService
{
    private readonly LakeTrackerContext _context;

    public WeatherServices(
    LakeTrackerContext context,
    IConnectionMultiplexer redis,
    ILogger<WeatherServices> logger,
    ClaimsPrincipal principal,
    IConfiguration config)
    : base(context, redis, logger, principal, config)
    {
        _context = context;
    }

    public async Task<ICollection<Domain.Weather>> GetWeather(int stationId)
    {
        var station = await _context.Stations.FindAsync(stationId);
        if (station == null)
        {
            throw new Exception($"No station found with id {stationId}");
        }
        
        var NOAAWeatherClient = new HttpClient();
        NOAAWeatherClient.BaseAddress = new Uri("https://api.tidesandcurrents.noaa.gov/api/prod/datagetter/");

        var waterRequest = await NOAAWeatherClient.GetAsync(
            $"?date=today&range=168&station={station.WeatherStationId}&product=water_temperature&time_zone=LST_LDT&interval=h&units=english&application=DataAPI_Sample&format=json");
        
        if (!waterRequest.IsSuccessStatusCode)
        {
            Logger.LogError("Failed to fetch water data from NOAA API.");
            return null;
        }
        
        var windRequest = await NOAAWeatherClient.GetAsync(
            $"?date=today&station={station.WeatherStationId}&product=wind&time_zone=LST_LDT&interval=h&units=english&application=DataAPI_Sample&format=json");
        
        if (!windRequest.IsSuccessStatusCode)
        {
            Logger.LogError("Failed to fetch wind data from NOAA API.");
            return null;
        }
        
        var temperatureRequest = await NOAAWeatherClient.GetAsync(
            $"?date=today&station={station.WeatherStationId}&product=air_temperature&time_zone=LST_LDT&interval=h&units=english&application=DataAPI_Sample&format=json");
        
        if (!temperatureRequest.IsSuccessStatusCode)
        {
            Logger.LogError("Failed to fetch air temperature data from NOAA API.");
            return null;
        }

        var weatherData = new List<Domain.Weather>();
        
        var waterJson = await waterRequest.Content.ReadFromJsonAsync<NoaaWeatherResponseWater>();
        var waterData = waterJson.Data.ToList();
        var windJson = await windRequest.Content.ReadFromJsonAsync<NoaaWeatherResponseWind>();
        var windData = windJson.Data.ToList();
        var temperatureJson = await temperatureRequest.Content.ReadFromJsonAsync<NoaaWeatherResponseTemperature>();
        var temperatureData = temperatureJson.Data.ToList();
        
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
            });
        }

        foreach (var w in weatherData)
        {
            w.StationId = station.Id;
        }
        return weatherData;
    }
}