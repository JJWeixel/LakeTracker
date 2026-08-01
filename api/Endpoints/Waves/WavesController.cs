using Microsoft.AspNetCore.Mvc;
using Exception = api.Exceptions.Exception;

namespace api.Endpoints.Waves;

[ApiController]
[Route("/waves")]
public class WavesController : BaseApiController
{
    private readonly WavesServices _services;
    public WavesController(WavesServices services)
    {
        _services = services;
    }
    
    [HttpGet("current")]
    public async Task<IActionResult> GetCurrentWaves(int stationId)
    {
        try
        {
            var waves = await _services.GetCurrentWaves(stationId);
            return Ok(waves);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet()]
    public async Task<IActionResult> GetWaves(int stationId, int nDays)
    {
        try
        {
            var waves = await _services.GetWaves(stationId, nDays);
            return Ok(waves);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }
}
