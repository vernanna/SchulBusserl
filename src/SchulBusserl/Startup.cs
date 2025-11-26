using Destructurama;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SchulBusserl.Api.ActionFilters;
using SchulBusserl.Api.ResourceFilters;
using SchulBusserl.Extensions;
using Serilog;
using ExceptionHandlerMiddleware = SchulBusserl.Api.Middleware.ExceptionHandlerMiddleware;

namespace SchulBusserl;

public class Startup
{
    protected readonly IConfigurationRoot Configuration;
    protected readonly IHostEnvironment HostEnvironment;

    public Startup(IHostEnvironment hostEnvironment)
    {
        HostEnvironment = hostEnvironment;

        // ReSharper disable once VirtualMemberCallInConstructor
        Configuration = BuildConfiguration();

        // Serilog configuration
        Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(Configuration)
            .Destructure.UsingAttributes()
            .CreateLogger();
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        if (HostEnvironment.IsDevelopment())
        {
            services.AddCors(options => options
                .AddDefaultPolicy(p => p
                    .WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod()));
        }

        services
            .AddControllers()
            .AddNewtonsoftJson(options => options.SerializerSettings.Configure());

        // In production, the Angular files will be served from this directory
        services.AddSpaStaticFiles(config => config.RootPath = "ClientApp/dist/browser");

        // Disable built-in model validation
        services.Configure<ApiBehaviorOptions>(options => { options.SuppressModelStateInvalidFilter = true; });

        // Action filters
        services
            .AddScoped<LoggingActionFilter>()
            .AddScoped<ModelStateValidationActionFilter>();

        // Resource filters
        services.AddScoped<IAllowEmptyBodyResourceFilter, AllowEmptyBodyResourceFilter>();

        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

        ConfigureDatabase();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public virtual void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        // Middleware
        app.UseMiddleware<ExceptionHandlerMiddleware>();

        if (!env.IsDevelopment())
        {
            app.UseHsts();
        }

        app.UseHttpsRedirection();

        app.UseStaticFiles();
        app.UseSpaStaticFiles();

        app.UseRouting();

        if (env.IsDevelopment())
        {
            app.UseCors();
        }

        app.UseEndpoints(endpoints => endpoints.MapControllers());

        app.UseSpa(spa => spa.Options.SourcePath = "ClientApp");

        using var scope = app.ApplicationServices.CreateScope();
        MigrateDatabase();
    }

    protected virtual IConfigurationRoot BuildConfiguration() =>
        new ConfigurationBuilder()
            .SetBasePath(HostEnvironment.ContentRootPath)
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile($"appsettings.{HostEnvironment.EnvironmentName}.json", optional: true, reloadOnChange: true)
            .AddEnvironmentVariables()
            .Build();

    protected virtual void ConfigureDatabase()
    {
        // todo: add database configuration
    }

    private static void MigrateDatabase()
    {
        // todo: migrate database
    }
}