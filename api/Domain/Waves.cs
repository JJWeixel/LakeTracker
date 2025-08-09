namespace api.Domain;

public class Waves
{
    public DateTime Time { get; set; }
    public string Buoy { get; set; }
    public double WaveHeight { get; set; }
    public double DominantWavePeriod { get; set; }
}