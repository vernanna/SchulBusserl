namespace SchulBusserl.Shared.Exceptions;

public class ResourceNotFoundException(string message, string displayMessage) : ApplicationException(message, displayMessage);