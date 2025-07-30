using System;
using Microsoft.Extensions.Logging;
using api.Exceptions;
using ArgumentNullException = api.Exceptions.ArgumentNullException;
using Exception = api.Exceptions.Exception;

namespace api.Logging
{
    public static class ExampleLogging
    {

        private static readonly Action<ILogger, string, Exception> _exampleLogError1String;
        static ExampleLogging()
        {

            _exampleLogError1String = LoggerMessage.Define<string>(
                LogLevel.Error,
                new EventId(10000, "ExampleErrorName"),
                "Example error description: {string}"
            );
        }

        public static Exception ExampleLogError1String(this ILogger logger, string exampleString)
        {
            var ex = new ArgumentNullException(10000, "ExampleErrorName");
            _exampleLogError1String(logger, exampleString, ex);
            return ex;
        }
    }
}
