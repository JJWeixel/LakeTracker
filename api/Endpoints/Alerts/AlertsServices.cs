using System.Security.Claims;
using System.Text.Json;
using api.Data;
using api.Endpoints.Alerts.RequestResponse;
using NRedisStack;
using NRedisStack.RedisStackCommands;
using StackExchange.Redis;

namespace api.Endpoints.Alerts;

public class AlertsServices : BaseService
{
    private readonly IDatabase _redisDatabase;
    private readonly JsonSerializerOptions _jsonOptions;

    public AlertsServices(
        LakeTrackerContext context,
        IConnectionMultiplexer redis,
        ILogger<AlertsServices> logger,
        ClaimsPrincipal principal,
        IConfiguration config)
        : base(context, redis, logger, principal, config)
    {
        _redisDatabase = redis.GetDatabase();
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = false
        };
    }

    private string stationId = "OHC035";

    public async Task<Domain.Alert?> GetAlertsFromCache()
    {
        var key = $"alerts:{stationId}";
        var cachedAlert = await _redisDatabase.StringGetAsync(key);
        if (cachedAlert.IsNullOrEmpty)
        {
            Logger.LogInformation("No cached alerts data found.");
            return null;
        }
        var alerts = JsonSerializer.Deserialize<Domain.Alert>(cachedAlert.ToString(), _jsonOptions);
        return alerts;
    }

    public async Task<ICollection<Domain.Alert>> GetAlerts()
    {
        var cachedAlert = await GetAlertsFromCache();
        if (cachedAlert != null)
        {
            Logger.LogInformation("Returning cached alerts data.");
            return new List<Domain.Alert> { cachedAlert };
        }

        Logger.LogInformation("Requesting alerts from weather.gov...");

        var alertsClient = new HttpClient();
        alertsClient.BaseAddress = new Uri("https://api.weather.gov/alerts/active/");
        alertsClient.DefaultRequestHeaders.Add("User-Agent", "LakeTracker (weixel.12@osu.edu)");
        alertsClient.DefaultRequestHeaders.Add("Accept", "application/ld+json");

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

        var alerts = alertsList.FirstOrDefault() ?? throw new Exception("No data");
        alerts.Station = stationId;
        var key = $"alerts:{alerts.Station}";
        var serialized = JsonSerializer.Serialize(alerts, _jsonOptions);
        await _redisDatabase.StringSetAsync(key, serialized, TimeSpan.FromMinutes(60));

        return alertsList;
    }

}
