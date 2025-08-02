using System.Text.Json.Serialization;

namespace api.Endpoints.Weather.RequestResponse.NoaaTemperature;

public class NoaaWeatherResponseDataTemperature
{
    [JsonPropertyName("t")]
    public DateTime Time { get; set; }
    [JsonPropertyName("v")]
    public double Value { get; set; }
    [JsonPropertyName("Flags")]
    public string Flags { get; set; }
}