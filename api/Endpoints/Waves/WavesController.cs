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
    
    [HttpGet()]
    public async Task<IActionResult> GetWaves()
    {
        try
        {
            var waves = await _services.GetWaves();
            return Ok(waves);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }
}
