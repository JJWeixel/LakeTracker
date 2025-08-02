using System.Text.Json.Serialization;

namespace api.Endpoints.Weather.RequestResponse.NoaaTemperature;

public class NoaaWeatherResponseTemperature
{
    [JsonPropertyName("metadata")]
    public NoaaWeatherResponseMetadata Metadata { get; set; }
    [JsonPropertyName("data")]
    public ICollection<NoaaWeatherResponseDataTemperature> Data { get; set; }
}