using System.Text.Json.Serialization;

namespace api.Endpoints.Weather.RequestResponse.NoaaWater;

public class NoaaWeatherResponseWater
{
    [JsonPropertyName("metadata")]
    public NoaaWeatherResponseMetadata Metadata { get; set; }
    [JsonPropertyName("data")]
    public ICollection<NoaaWeatherResponseDataWater> Data { get; set; }
}