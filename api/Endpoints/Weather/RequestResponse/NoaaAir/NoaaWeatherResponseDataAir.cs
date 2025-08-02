using System.Text.Json.Serialization;

namespace api.Endpoints.Weather.RequestResponse.NoaaAir;

public class NoaaWeatherResponseDataAir
{
    [JsonPropertyName("t")]
    public DateTime Time { get; set; }
    [JsonPropertyName("v")]
    public double Value { get; set; }
    [JsonPropertyName("Flags")]
    public string Flags { get; set; }
}