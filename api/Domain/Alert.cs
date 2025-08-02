namespace api.Domain;

public class Alert
{
    public string Event { get; set; }
    public DateTime Effective { get; set; }
    public DateTime Onset { get; set; }
    public DateTime Ends { get; set; }
    public string Severity { get; set; }
    public string Description { get; set; }
    public string Instruction { get; set; }
}