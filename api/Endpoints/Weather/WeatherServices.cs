using System.Security.Claims;
using api.Data;

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

        NOAAWeatherClient.GetAsync(
            "?date=today&station=9063063&product=water_temperature&time_zone=LST_LTD&interval=h&units=english&application=DataAPI_Sample&format=json");
        // Simulate fetching weather data
        // In a real application, this would involve database access or an external API call
        return "Sunny, 25°C";
    }
}