using System.Security.Claims;
using api.Data;
using api.Endpoints.Weather.RequestResponse.NoaaTemperature;
using api.Endpoints.Weather.RequestResponse.NoaaWater;
using api.Endpoints.Weather.RequestResponse.NoaaWind;

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

    public async Task<string> GetWeather()
    {
        var NOAAWeatherClient = new HttpClient();
        NOAAWeatherClient.BaseAddress = new Uri("https://api.tidesandcurrents.noaa.gov/api/prod/datagetter");

        var waterRequest = await NOAAWeatherClient.GetAsync(
            "?date=today&station=9063063&product=water_temperature&time_zone=LST_LTD&interval=h&units=english&application=DataAPI_Sample&format=json");
        
        if (!waterRequest.IsSuccessStatusCode)
        {
            Logger.LogError("Failed to fetch weather data from NOAA API.");
            return "Error fetching weather data.";
        }
        
        var windRequest = await NOAAWeatherClient.GetAsync(
            "?date=today&station=9063063&product=wind&time_zone=LST_LTD&interval=h&units=english&application=DataAPI_Sample&format=json");
        
        if (!windRequest.IsSuccessStatusCode)
        {
            Logger.LogError("Failed to fetch wind data from NOAA API.");
            return "Error fetching wind data.";
        }
        
        var temperatureRequest = await NOAAWeatherClient.GetAsync(
            "?date=today&station=9063063&product=air_temperature&time_zone=LST_LTD&interval=h&units=english&application=DataAPI_Sample&format=json");
        
        if (!temperatureRequest.IsSuccessStatusCode)
        {
            Logger.LogError("Failed to fetch air temperature data from NOAA API.");
            return "Error fetching air temperature data.";
        }
        
        var waterJson = await waterRequest.Content.ReadFromJsonAsync<NoaaWeatherResponseWater>();
        var waterData = waterJson.Data.ToList();
        var windJson = await windRequest.Content.ReadFromJsonAsync<NoaaWeatherResponseWind>();
        var windData = windJson.Data.ToList();
        var temperatureJson = await temperatureRequest.Content.ReadFromJsonAsync<NoaaWeatherResponseTemperature>();
        var temperatureData = temperatureJson.Data.ToList();

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
        
    }
}