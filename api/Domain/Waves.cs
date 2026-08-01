namespace api.Domain;

public class Waves
{
    public int Id { get; set; }
    public DateTime Time { get; set; }
    public int StationId { get; set; }
    public Station? Station { get; set; }
    public double? WaveHeight { get; set; }
    public double? DominantWavePeriod{ get; set; }
}