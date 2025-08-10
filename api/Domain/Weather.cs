namespace api.Domain;

public class Weather
{
    public DateTime Time { get; set; }
    public string Station { get; set; }
    public double AirTemperature { get; set; }
    public double WaterTemperature { get; set; }
    public double WindSpeed { get; set; }
    public double WindDirection { get; set; }
    public string WindDirectionReadable { get; set; }
    public double GustSpeed { get; set; }
    public double WaterTemperatureHigh { get; set; }
    public double WaterTemperatureLow { get; set; }
}