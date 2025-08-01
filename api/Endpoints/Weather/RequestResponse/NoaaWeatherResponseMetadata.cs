using System.Text.Json.Serialization;

namespace api.Endpoints.Weather.RequestResponse;

public class NoaaWeatherResponseMetadata
{
    [JsonPropertyName("id")]
    public string StationId { get; set; }
    [JsonPropertyName("name")]
    public string StationName { get; set; }
    [JsonPropertyName("lat")]
    public double Latitude { get; set; }
    [JsonPropertyName("lon")]
    public double Longitude { get; set; }
}