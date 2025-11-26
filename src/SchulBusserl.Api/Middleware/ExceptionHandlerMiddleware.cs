using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using SchulBusserl.Api.Entities;
using SchulBusserl.Shared.Exceptions;
using ApplicationException = SchulBusserl.Shared.Exceptions.ApplicationException;

namespace SchulBusserl.Api.Middleware;

/// <summary>
///     Catches exceptions thrown by the application and converts them into an <see cref="ObjectResult" />.
/// </summary>
public class ExceptionHandlerMiddleware(RequestDelegate next, ILogger<ExceptionHandlerMiddleware> logger)
{
    /// <summary>
    ///     Automatically invoked.
    /// </summary>
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException exception)
        {
            logger.LogError(exception, "A validation exception occurred while processing the request.");

            var actionContext = new ActionContext(context, context.GetRouteData(), new ActionDescriptor());
            var objectResult = BadRequestObjectResult(exception);
            await objectResult.ExecuteResultAsync(actionContext);
        }
        catch (ResourceNotFoundException exception)
        {
            logger.LogError(exception, "A requested resource was not found.");

            var actionContext = new ActionContext(context, context.GetRouteData(), new ActionDescriptor());
            var objectResult = NotFoundObjectResult(exception);
            await objectResult.ExecuteResultAsync(actionContext);
        }
        catch (ApplicationException exception)
        {
            logger.LogError(exception, "An application exception occurred while processing the request.");

            var actionContext = new ActionContext(context, context.GetRouteData(), new ActionDescriptor());
            var objectResult = BadRequestObjectResult(exception);
            await objectResult.ExecuteResultAsync(actionContext);
        }
        catch (ArgumentException exception)
        {
            logger.LogError(exception, "An argument exception occurred while processing the request.");

            var actionContext = new ActionContext(context, context.GetRouteData(), new ActionDescriptor());
            var objectResult = BadRequestObjectResult();
            await objectResult.ExecuteResultAsync(actionContext);
        }
        catch (OperationCanceledException exception)
        {
            logger.LogWarning(exception, "The request has been canceled.");

            var actionContext = new ActionContext(context, context.GetRouteData(), new ActionDescriptor());
            var objectResult = BadRequestObjectResult();
            await objectResult.ExecuteResultAsync(actionContext);
        }
        catch (InvalidOperationException exception)
        {
            logger.LogError(exception, "An invalid operation exception occurred while processing the request.");

            var actionContext = new ActionContext(context, context.GetRouteData(), new ActionDescriptor());
            var objectResult = InternalServerErrorObjectResult();
            await objectResult.ExecuteResultAsync(actionContext);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "An exception occurred while processing the request.");

            var actionContext = new ActionContext(context, context.GetRouteData(), new ActionDescriptor());
            var objectResult = InternalServerErrorObjectResult();
            await objectResult.ExecuteResultAsync(actionContext);
        }
        finally
        {
            logger.LogInformation($"Request finished with status code {context.Response.StatusCode}.");
        }
    }

    private ObjectResult BadRequestObjectResult(ValidationException exception) =>
        new(new ErrorResult(ErrorCode.ValidationFailed, exception.DisplayMessage))
        {
            StatusCode = (int)HttpStatusCode.BadRequest
        };

    private ObjectResult BadRequestObjectResult(ApplicationException exception) =>
        new(new ErrorResult(ErrorCode.Failure, exception.DisplayMessage))
        {
            StatusCode = (int)HttpStatusCode.BadRequest
        };

    private ObjectResult BadRequestObjectResult() =>
        new(new ErrorResult(ErrorCode.Failure, "An error occurred while processing the request."))
        {
            StatusCode = (int)HttpStatusCode.BadRequest
        };

    private ObjectResult NotFoundObjectResult(ResourceNotFoundException exception) =>
        new NotFoundObjectResult(new ErrorResult(ErrorCode.ResourceNotFound, exception.DisplayMessage))
        {
            StatusCode = (int)HttpStatusCode.NotFound
        };

    private ObjectResult InternalServerErrorObjectResult() =>
        new(new ErrorResult(ErrorCode.Failure, "An error occurred while processing the request."))
        {
            StatusCode = (int)HttpStatusCode.InternalServerError
        };
}