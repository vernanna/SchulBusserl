namespace SchulBusserl.Shared.Exceptions;

public class ValidationException(string message, string displayMessage) : ApplicationException(message, displayMessage);