using System.Text.Json.Serialization;

namespace api.Endpoints.Weather.RequestResponse.NoaaWind;

public class NoaaWeatherResponseDataWind
{
    [JsonPropertyName("t")]
    public DateTime Time { get; set; }
    [JsonPropertyName("s")]
    public double Speed { get; set; }
    [JsonPropertyName("d")]
    public double Direction { get; set; }
    [JsonPropertyName("dr")]
    public string DirectionReadable { get; set; }
    [JsonPropertyName("g")]
    public double Gust { get; set; }
    [JsonPropertyName("Flags")]
    public string Flags { get; set; }
}