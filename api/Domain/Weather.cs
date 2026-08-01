namespace api.Domain;

public class Weather
{
    public int Id { get; set; }
    public DateTime Time { get; set; }
    public Station? Station { get; set; }
    public int StationId { get; set; }
    public double AirTemperature { get; set; }
    public double WaterTemperature { get; set; }
    public double WindSpeed { get; set; }
    public double WindDirection { get; set; }
    public string? WindDirectionReadable { get; set; }
    public double GustSpeed { get; set; }
}