using System.Text.Json.Serialization;

namespace api.Endpoints.Weather.RequestResponse.NoaaAir;

public class NoaaWeatherResponseAir
{
    [JsonPropertyName("metadata")]
    public NoaaWeatherResponseMetadata Metadata { get; set; }
    [JsonPropertyName("data")]
    public ICollection<NoaaWeatherResponseDataAir> Data { get; set; }
}