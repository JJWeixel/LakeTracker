using System.Globalization;
using System.Text.Json.Serialization;

namespace api.Endpoints.Alerts.RequestResponse;

public class NoaaAlertsResponseGeometry
{
    [JsonPropertyName("type")]
    public string Type { get; set; }
    
    [JsonPropertyName("coordinates")]
    public double[][][] Coordinates { get; set; }
}