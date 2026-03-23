using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace SchulBusserl.Infrastructure.Persistence.Interceptors;

public class SqliteConnectionInterceptor : DbConnectionInterceptor
{
    public override void ConnectionOpened(DbConnection connection, ConnectionEndEventData eventData) =>
        ExecutePragmas(connection);

    public override Task ConnectionOpenedAsync(
        DbConnection connection,
        ConnectionEndEventData eventData,
        CancellationToken cancellationToken = default)
    {
        ExecutePragmas(connection);
        return Task.CompletedTask;
    }

    private static void ExecutePragmas(DbConnection connection)
    {
        using var command = connection.CreateCommand();
        command.CommandText =
            """
            PRAGMA journal_mode=WAL;       -- Write-Ahead Logging: better crash recovery and allows concurrent reads during writes
            PRAGMA foreign_keys=ON;        -- SQLite defaults to OFF; must be enabled per-connection to enforce referential integrity
            PRAGMA busy_timeout=5000;      -- Wait up to 5s for a lock instead of failing immediately
            """;
        command.ExecuteNonQuery();
    }
}