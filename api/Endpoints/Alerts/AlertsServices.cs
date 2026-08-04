using System.Security.Claims;
using System.Text.Json;
using api.Data;
using api.Endpoints.Alerts.RequestResponse;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Alerts;

public class AlertsServices : BaseService
{
    private readonly LakeTrackerContext _context;

    public AlertsServices(
        LakeTrackerContext context,
        ILogger<AlertsServices> logger,
        ClaimsPrincipal principal,
        IConfiguration config)
        : base(context, logger, principal, config)
    {
        _context = context;
    }

    public async Task<ICollection<Domain.Alert>> FetchAlerts(int stationId)
    {
        var station = await _context.Stations.FindAsync(stationId);
        if (station == null)
        {
            throw new Exception($"No station found with id {stationId}");
        }

        Logger.LogInformation("Requesting alerts from weather.gov...");

        var alertsClient = new HttpClient();
        alertsClient.BaseAddress = new Uri("https://api.weather.gov/alerts/active/");
        alertsClient.DefaultRequestHeaders.Add("User-Agent", "LakeTracker (weixel.12@osu.edu)");
        alertsClient.DefaultRequestHeaders.Add("Accept", "application/ld+json");

        var alertsRequest = await alertsClient.GetAsync($"zone/{station.AlertZoneId}");

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

        foreach (var w in alertsList)
        {
            w.StationId = station.Id;
        }
        return alertsList;
    }

    public async Task<ICollection<Domain.Alert>> GetAlerts(int stationId)
    {
        var now = DateTime.UtcNow;

        return await _context.Alerts
            .AsNoTracking()
            .Where(a => a.StationId == stationId && a.Effective <= now && a.Ends >= now)
            .OrderByDescending(a => a.Ends)
            .ToListAsync();
    }
}
