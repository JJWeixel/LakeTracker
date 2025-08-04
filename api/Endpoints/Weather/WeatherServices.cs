using System.Security.Claims;
using api.Data;
using api.Endpoints.Weather.RequestResponse.NoaaTemperature;
using api.Endpoints.Weather.RequestResponse.NoaaWater;
using api.Endpoints.Weather.RequestResponse.NoaaWind;
using api.Endpoints.Weather.RequestResponse.NdbcWaves;

namespace api.Endpoints.Weather;

public class WeatherServices : BaseService
{
    public WeatherServices(
    LakeTrackerContext context,
    ILogger<WeatherServices> logger,
    ClaimsPrincipal principal,
    IConfiguration config)
    : base(context, logger, principal, config)
    {
    }

    public async Task<ICollection<Domain.Weather>> GetWeather()
    {
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

        for (int i = 0; i < waterData.Count; i++)
        {
            if (i >= windData.Count || i >= temperatureData.Count)
            {
                Logger.LogWarning("Data mismatch: Not enough wind or temperature data for the water data available.");
                break;
            }
            var water = waterData[i];
            var wind = windData[i];
            var temperature = temperatureData[i];
            var wave = allWaves.FirstOrDefault(w =>
                Math.Abs((w.Timestamp - water.Time).TotalMinutes) <= 60);

            if (water.Time - temperature.Time > TimeSpan.FromHours(1) || water.Time - wind.Time > TimeSpan.FromHours(1))
            {
                Logger.LogError("Data mismatch: Water, wind, and temperature data timestamps do not align.");
                return null;
            }
            weatherData.Add(new Domain.Weather
            {
                AirTemperature = temperature.Value,
                WaterTemperature = water.Value,
                WindSpeed = wind.Speed,
                WindDirection = wind.Direction,
                WindDirectionReadable = wind.DirectionReadable,
                GustSpeed = wind.Gust,
            });
            
        }

        return weatherData;
    }
}