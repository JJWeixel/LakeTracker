namespace api.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(int eventId, string message) : base(eventId, message) { }
    }
}
