using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using SchulBusserl;
using Serilog;

await Host.CreateDefaultBuilder(args)
    .ConfigureWebHostDefaults(webBuilder =>
        webBuilder
            .UseContentRoot(AppContext.BaseDirectory)
            .UseStartup<Startup>()
            .UseDefaultServiceProvider((context, options) => options.ValidateScopes = context.HostingEnvironment.IsDevelopment()))
    .UseSerilog()
    .Build()
    .RunAsync();