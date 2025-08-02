using System.Security.Claims;
using api.Data;
using api.Endpoints.Weather.RequestResponse.NoaaTemperature;
using api.Endpoints.Weather.RequestResponse.NoaaWater;

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
        
        var waterData = await waterRequest.Content.ReadFromJsonAsync<NoaaWeatherResponseWater>();
        var windData = await windRequest.Content.ReadFromJsonAsync<NoaaWeatherResponseWind>();
        var temperatureData = await temperatureRequest.Content.ReadFromJsonAsync<NoaaWeatherResponseTemperature>();
        
        
        
        
        
    }
}

public class NoaaWeatherResponseTemperature
{
}