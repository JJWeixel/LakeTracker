using System.Globalization;
using System.Text.Json.Serialization;

namespace api.Endpoints.Alerts.RequestResponse;

public class NoaaAlertsResponseProperties {

    [JsonPropertyName("sent")]
    public DateTime Sent { get; set; }

    [JsonPropertyName("effective")]
    public DateTime Effective { get; set; }

    [JsonPropertyName("onset")]
    public DateTime Onset { get; set; }

    [JsonPropertyName("expires")]
    public DateTime Expires { get; set; }

    [JsonPropertyName("ends")]
    public DateTime Ends { get; set; }

    [JsonPropertyName("status")]
    public string Status { get; set; }

    [JsonPropertyName("messageType")]
    public string MessageType { get; set; }

    [JsonPropertyName("category")]
    public string Category { get; set; }

    [JsonPropertyName("severity")]
    public string Severity { get; set; }

    [JsonPropertyName("certainty")]
    public string Certainty { get; set; }

    [JsonPropertyName("urgency")]
    public string Urgency { get; set; }

    [JsonPropertyName("event")]
    public string Event { get; set; }

    [JsonPropertyName("headline")]
    public string Headline { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; }

    [JsonPropertyName("instruction")]
    public string Instruction { get; set; }

    [JsonPropertyName("response")]
    public string Response { get; set; }
}