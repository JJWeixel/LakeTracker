namespace api.Domain;

public class Alert
{
    public int Id { get; set; }
    public Station? Station { get; set; }
    public int StationId { get; set; }
    public required string Event { get; set; }
    public DateTime Effective { get; set; }
    public DateTime Onset { get; set; }
    public DateTime Ends { get; set; }
    public required string Severity { get; set; }
    public required string Description { get; set; }
    public required string Instruction { get; set; }
}