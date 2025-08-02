using System.Text.Json.Serialization;

namespace api.Endpoints.Weather.RequestResponse.NoaaTemperature;

public class NoaaWeatherResponseWind
{
    [JsonPropertyName("metadata")]
    public NoaaWeatherResponseMetadata Metadata { get; set; }
    [JsonPropertyName("data")]
    public ICollection<NoaaWeatherResponseDataWind> Data { get; set; }
}