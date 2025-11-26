using Microsoft.AspNetCore.Mvc;

namespace SchulBusserl.Api.Controllers;

[Route("api/application-info")]
public class ApplicationInfoController : ApiController
{
    [HttpGet]
    public string GetApplicationInfo() => "Test";
}