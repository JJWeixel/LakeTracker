using System.Text.Json.Serialization;

namespace api.Endpoints.Alerts.RequestResponse;

public class NoaaAlertsResponse
{
    [JsonPropertyName("type")]
    public string Type { get; set; }
    [JsonPropertyName("features")]
    public ICollection<NoaaAlertsResponseFeatures> Features { get; set; }
}