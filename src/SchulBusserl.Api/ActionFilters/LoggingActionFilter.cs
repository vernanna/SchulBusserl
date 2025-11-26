using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using SchulBusserl.Shared.Extensions;

namespace SchulBusserl.Api.ActionFilters;

/// <summary>
///     Action filter used to log request and response.
/// </summary>
public class LoggingActionFilter(ILogger<LoggingActionFilter> logger) : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        var request = context.HttpContext.Request;
        // ReSharper disable once ConditionalAccessQualifierIsNonNullableAccordingToAPIContract
        var username = context.HttpContext.User.Identity?.Name ?? "Unknown";
        if (!logger.IsEnabled(LogLevel.Debug))
        {
            logger.LogInformation("({Username}) Request starting {Protocol} {Method} {Url}.", username, request.Protocol, request.Method, request.GetDisplayUrl());
        }

        logger.LogDebug(
            "({Username}) Executing action method '{ActionMethod}' with arguments {@Arguments}.",
            username,
            context.ActionDescriptor.DisplayName,
            context.ActionArguments);
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        // ReSharper disable once ConditionalAccessQualifierIsNonNullableAccordingToAPIContract
        var username = context.HttpContext.User.Identity?.Name ?? "Unknown";
        var objectResult = context.Result as ObjectResult;
        if (!logger.IsEnabled(LogLevel.Debug))
        {
            logger.LogInformation("({Username}) Executed action method '{ActionMethod}'.", username, context.ActionDescriptor.DisplayName);
        }

        logger.LogDebug("({Username}) Executed action method '{ActionMethod}' with result object {@Object}.", username, context.ActionDescriptor.DisplayName, objectResult?.Value);

        context.Exception?.Apply(() => logger.LogError(context.Exception, "An unhandled exception occurred while executing the request."));
    }
}