using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace SchulBusserl.Infrastructure.Configuration;

public static class DatabasePathResolver
{
    public static string ResolveDatabasePath(IConfiguration configuration, IHostEnvironment environment)
    {
        var dbOptions = configuration.GetSection(DatabaseOptions.SectionName).Get<DatabaseOptions>();
        var configuredPath = dbOptions?.Path;

        if (!string.IsNullOrWhiteSpace(configuredPath))
        {
            return Environment.ExpandEnvironmentVariables(configuredPath);
        }

        var basePath = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
        var appFolder = environment.IsDevelopment() ? "SchulBusserl-Dev" : "SchulBusserl";
        return Path.Combine(basePath, appFolder, "data", "schulbusserl.db");
    }
}
