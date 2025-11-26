using Microsoft.AspNetCore.Mvc.Filters;

namespace SchulBusserl.Api.ResourceFilters;

public class AllowEmptyBodyResourceFilter : IAllowEmptyBodyResourceFilter
{
    public void OnResourceExecuting(ResourceExecutingContext context)
    {
        if (context.HttpContext.Request.ContentType == null && context.HttpContext.Request.ContentLength == 0)
        {
            context.HttpContext.Request.ContentType = "application/json";
        }
    }

    public void OnResourceExecuted(ResourceExecutedContext _) { }
}