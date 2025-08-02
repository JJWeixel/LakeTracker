using System.Globalization;
using System.Text.Json.Serialization;

namespace api.Endpoints.Weather.RequestResponse.NoaaWater;

public class NoaaWeatherResponseDataWater
{
    private const string DateFormat = "yyyy-MM-dd HH:mm";

    [JsonPropertyName("t")]
    public string TimeRaw { get; set; }

    [JsonIgnore]
    public DateTime Time => DateTime.ParseExact(TimeRaw, DateFormat, CultureInfo.InvariantCulture);

    [JsonPropertyName("v")]
    public double Value { get; set; }

    [JsonPropertyName("Flags")]
    public string Flags { get; set; }
}