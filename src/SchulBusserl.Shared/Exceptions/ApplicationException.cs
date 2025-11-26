using System;

namespace SchulBusserl.Shared.Exceptions;

public class ApplicationException(string message, string displayMessage, Exception? innerException = null) : Exception(message, innerException)
{
    public string DisplayMessage { get; } = displayMessage;
}