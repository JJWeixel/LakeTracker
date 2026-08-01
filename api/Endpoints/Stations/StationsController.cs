using Microsoft.AspNetCore.Mvc;
using Exception = api.Exceptions.Exception;

namespace api.Endpoints.Stations;

[ApiController]
[Route("/stations")]
public class StationsController : BaseApiController
{
    private readonly StationsServices _services;
    public StationsController(StationsServices services)
    {
        _services = services;
    }
    
    [HttpGet("current")]
    public async Task<IActionResult> GetCurrentStations(int stationId)
    {
        try
        {
            var stations = await _services.GetCurrentStations(stationId);
            return Ok(stations);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet()]
    public async Task<IActionResult> GetStations()
    {
        try
        {
            var stations = await _services.GetStations();
            return Ok(stations);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }
}
