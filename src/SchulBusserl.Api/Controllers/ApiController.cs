using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SchulBusserl.Api.ActionFilters;
using SchulBusserl.Shared.Extensions;

namespace SchulBusserl.Api.Controllers;

/// <summary>
///     Base class for all API controller implementations.
/// </summary>
[ApiController]
[ServiceFilter(typeof(LoggingActionFilter))]
[ServiceFilter(typeof(ModelStateValidationActionFilter))]
public abstract class ApiController : Controller
{
    public override void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.Result is ObjectResult objectResult && objectResult.Value?.GetType().GetGenericInterface(typeof(IAsyncEnumerable<>)) != null)
        {
            objectResult.Value = AsyncEnumerable.ToListAsync((dynamic)objectResult.Value).Result;
        }
    }
}