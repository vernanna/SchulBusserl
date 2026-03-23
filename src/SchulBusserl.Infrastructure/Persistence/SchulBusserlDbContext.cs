using Microsoft.EntityFrameworkCore;
using SchulBusserl.Application.Interfaces;

namespace SchulBusserl.Infrastructure.Persistence;

public class SchulBusserlDbContext(DbContextOptions<SchulBusserlDbContext> options)
    : DbContext(options), IUnitOfWork
{
    protected override void OnModelCreating(ModelBuilder modelBuilder) =>
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(SchulBusserlDbContext).Assembly);
}
