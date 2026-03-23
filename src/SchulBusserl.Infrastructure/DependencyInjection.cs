using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SchulBusserl.Application.Interfaces;
using SchulBusserl.Infrastructure.Configuration;
using SchulBusserl.Infrastructure.Persistence;
using SchulBusserl.Infrastructure.Persistence.Interceptors;

namespace SchulBusserl.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration,
        IHostEnvironment environment)
    {
        var dbPath = DatabasePathResolver.ResolveDatabasePath(configuration, environment);

        var connectionString = $"Data Source={dbPath}";

        services.AddDbContext<SchulBusserlDbContext>(options =>
            options.UseSqlite(connectionString)
                .AddInterceptors(new SqliteConnectionInterceptor()));

        services.AddScoped<IUnitOfWork>(sp => sp.GetRequiredService<SchulBusserlDbContext>());

        return services;
    }

    public static void MigrateDatabase(this IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var services = scope.ServiceProvider;

        var logger = services.GetRequiredService<ILoggerFactory>()
            .CreateLogger(typeof(DependencyInjection));

        var configuration = services.GetRequiredService<IConfiguration>();
        var environment = services.GetRequiredService<IHostEnvironment>();
        var dbPath = DatabasePathResolver.ResolveDatabasePath(configuration, environment);

        logger.LogInformation("Using database at {DatabasePath}", dbPath);

        var directory = Path.GetDirectoryName(dbPath)
            ?? throw new InvalidOperationException($"Cannot determine directory for database path: {dbPath}");
        Directory.CreateDirectory(directory);

        var dbContext = services.GetRequiredService<SchulBusserlDbContext>();
        dbContext.Database.Migrate();
    }
}
