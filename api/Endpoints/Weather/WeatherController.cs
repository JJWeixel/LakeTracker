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
    
    [HttpGet("current")]
    public async Task<IActionResult> GetCurrentWeather(int stationId)
    {
        try
        {
            var weather = await _services.GetCurrentWeather(stationId);
            return Ok(weather);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet()]
    public async Task<IActionResult> GetWeather(int stationId, int nDays)
    {
        try
        {
            var weather = await _services.GetWeather(stationId, nDays);
            return Ok(weather);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }
}