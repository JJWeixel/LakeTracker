using System.Globalization;
using System.Text.Json.Serialization;

namespace api.Endpoints.Alerts.RequestResponse;

public class NoaaAlertsResponseFeatures
{
    [JsonPropertyName("id")]
    public string Id { get; set; }
    
    [JsonPropertyName("type")]
    public string Type { get; set; }
    
    [JsonPropertyName("geometry")]
    public NoaaAlertsResponseGeometry Geometry { get; set; }
    
    [JsonPropertyName("properties")]
    public NoaaAlertsResponseProperties Properties { get; set; }
}