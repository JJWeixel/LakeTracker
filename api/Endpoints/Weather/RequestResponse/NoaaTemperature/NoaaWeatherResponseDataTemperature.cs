using System.Globalization;
using System.Text.Json.Serialization;

namespace api.Endpoints.Weather.RequestResponse.NoaaTemperature;

public class NoaaWeatherResponseDataTemperature
{
    private const string DateFormat = "yyyy-MM-dd HH:mm";

    [JsonPropertyName("t")]
    public string TimeRaw { get; set; }

    [JsonIgnore]
    public DateTime Time => DateTime.SpecifyKind(
        DateTime.ParseExact(TimeRaw, DateFormat, CultureInfo.InvariantCulture),
        DateTimeKind.Utc);
    [JsonPropertyName("v")]
    public double Value { get; set; }
    [JsonPropertyName("Flags")]
    public string Flags { get; set; }
}