namespace SchulBusserl.Api.ActionFilters;

/// <summary>
///     Entity mapping an action argument to a validation error.
/// </summary>
public class ModelStateValidationError
{
    public ModelStateValidationError(string argumentName, string validationMessage, string fallbackValidationMessage)
    {
        if (string.IsNullOrWhiteSpace(validationMessage))
        {
            validationMessage = fallbackValidationMessage;
        }

        ArgumentName = argumentName;
        ValidationMessage = validationMessage;
    }

    /// <summary>
    ///     The name of the validated action argument.
    /// </summary>
    public string ArgumentName { get; }

    /// <summary>
    ///     The validation message.
    /// </summary>
    public string ValidationMessage { get; }

    public override string ToString() => $"{ArgumentName}: {ValidationMessage}";
}