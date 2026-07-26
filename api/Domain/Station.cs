namespace api.Domain;

public class Station
{
    public int Id { get; set; }
    public required string RegionCode { get; set; }
    public required string RegionLabel { get; set; }
    public required string WeatherStationId { get; set; }
    public required string AlertZoneId { get; set; }
    public required string BuoyId { get; set; }
}