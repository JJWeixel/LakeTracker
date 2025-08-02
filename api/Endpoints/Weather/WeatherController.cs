using Microsoft.AspNetCore.Mvc;
using Exception = api.Exceptions.Exception;

namespace api.Endpoints.Weather;

[ApiController]
[Route("/weather")]
public class WeatherController : BaseApiController
{
    private readonly WeatherServices _services;
    public WeatherController(WeatherServices services)
    {
        _services = services;
    }
    
    [HttpGet()]
    public async Task<IActionResult> GetWeather()
    {
        try
        {
            var weather = await _services.GetWeather();
            return Ok(weather);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }
    
}