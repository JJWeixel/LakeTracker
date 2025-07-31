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

    
    public string GetWeather()
    {
        // Simulate fetching weather data
        // In a real application, this would involve database access or an external API call
        return "Sunny, 25°C";
    }
}