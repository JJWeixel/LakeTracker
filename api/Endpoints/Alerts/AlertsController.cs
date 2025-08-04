using Microsoft.AspNetCore.Mvc;
using Exception = api.Exceptions.Exception;

namespace api.Endpoints.Alerts;

[ApiController]
[Route("/alerts")]
public class AlertsController : BaseApiController
{
    private readonly AlertsServices _services;
    public AlertsController(AlertsServices services)
    {
        _services = services;
    }
    
    [HttpGet()]
    public async Task<IActionResult> GetAlerts()
    {
        try
        {
            var alerts = await _services.GetAlerts();
            return Ok(alerts);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }
    
}