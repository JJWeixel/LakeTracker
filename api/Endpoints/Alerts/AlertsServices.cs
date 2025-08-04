using System.Security.Claims;
using System.Text.Json;
using api.Data;
using api.Endpoints.Alerts.RequestResponse;

namespace api.Endpoints.Alerts;

public class AlertsServices : BaseService
{
    public AlertsServices(
        LakeTrackerContext context,
        ILogger<AlertsServices> logger,
        ClaimsPrincipal principal,
        IConfiguration config)
        : base(context, logger, principal, config)
    {
    }

    public async Task<ICollection<Domain.Alert>> GetAlerts()
    {
        Logger.LogInformation("Requesting alerts from weather.gov...");

        var alertsClient = new HttpClient();
        alertsClient.BaseAddress = new Uri("https://api.weather.gov/alerts/active/");

        var alertsRequest = await alertsClient.GetAsync("zone/OHC035");

        if (!alertsRequest.IsSuccessStatusCode)
        {
            Logger.LogError("Failed to fetch alerts data from API: " + alertsRequest.StatusCode);
            return null;
        }

        var content = await alertsRequest.Content.ReadAsStringAsync();
        Logger.LogInformation("Raw alert response: " + content);

        var alertsJson = JsonSerializer.Deserialize<NoaaAlertsResponse>(content);
        if (alertsJson?.Features == null || alertsJson.Features.Count == 0)
        {
            Logger.LogWarning("No alert features found in the response.");
            return new List<Domain.Alert>(); // or null
        }

        var alertsList = alertsJson.Features.Select(feature => new Domain.Alert
        {
            Event = feature.Properties.Event,
            Effective = feature.Properties.Effective,
            Onset = feature.Properties.Onset,
            Ends = feature.Properties.Ends,
            Severity = feature.Properties.Severity,
            Description = feature.Properties.Description,
            Instruction = feature.Properties.Instruction
        }).ToList();

        Logger.LogInformation($"Parsed {alertsList.Count} alerts successfully.");
        return alertsList;
    }

}
