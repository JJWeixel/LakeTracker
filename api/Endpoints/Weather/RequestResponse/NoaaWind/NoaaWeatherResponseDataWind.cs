using System.Globalization;
using System.Text.Json.Serialization;

namespace api.Endpoints.Weather.RequestResponse.NoaaWind;

public class NoaaWeatherResponseDataWind
{
    private const string DateFormat = "yyyy-MM-dd HH:mm";

    [JsonPropertyName("t")]
    public string TimeRaw { get; set; }

    [JsonIgnore]
    public DateTime Time => DateTime.ParseExact(TimeRaw, DateFormat, CultureInfo.InvariantCulture);
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