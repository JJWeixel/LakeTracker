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
    public IActionResult GetWeather()
    {
        try
        {
            var weather = _services.GetWeather();
            return Ok(weather);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }
    
}