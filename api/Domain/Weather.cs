namespace api.Domain;

public class Weather
{
    public float AirTemperature { get; set; }
    public float WaterTemperature { get; set; }
    public float WindSpeed { get; set; }
    public float WindDirection { get; set; }
    public string WindDirectionReadable { get; set; }
    public float GustSpeed { get; set; }
    public float WaveHeight { get; set; }
    public float DominantWavePeriod { get; set; }
    public float Visibility { get; set; }
}