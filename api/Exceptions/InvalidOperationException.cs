namespace api.Exceptions
{
    public class InvalidOperationException : Exception
    {
        public InvalidOperationException(int eventId, string message) : base(eventId, message) { }
    }
}
