using System.Collections.Generic;
using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;
using SchulBusserl.Api.Entities;

namespace SchulBusserl.Api.ActionFilters;

/// <summary>
///     ActionFilter used to validate the model state and stop further execution if necessary.
/// </summary>
public class ModelStateValidationActionFilter(ILogger<ModelStateValidationActionFilter> logger) : IActionFilter
{
    private const string InvalidInputDefaultMessage = "The input was not valid.";

    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (context.ModelState.IsValid)
        {
            return;
        }

        var validationErrors = CreateValidationErrors(context.ModelState);
        logger.LogWarning("Model state not valid: {@ValidationErrors}.", validationErrors);

        context.Result = CreateErrorResult(validationErrors);
    }

    public void OnActionExecuted(ActionExecutedContext context) { }

    private static IEnumerable<ModelStateValidationError> CreateValidationErrors(ModelStateDictionary modelState) =>
        modelState.SelectMany(pair => (pair.Value?.Errors ?? []).Select(error => new ModelStateValidationError(pair.Key, error.ErrorMessage, InvalidInputDefaultMessage)));

    private static ObjectResult CreateErrorResult(IEnumerable<ModelStateValidationError> validationErrors)
    {
        var errorMessages = validationErrors
            .Select(validationError => validationError.ToString())
            .DefaultIfEmpty(InvalidInputDefaultMessage);
        var message = string.Join(" ", errorMessages);

        return new ObjectResult(new ErrorResult(ErrorCode.ValidationFailed, message))
        {
            StatusCode = (int)HttpStatusCode.BadRequest
        };
    }
}