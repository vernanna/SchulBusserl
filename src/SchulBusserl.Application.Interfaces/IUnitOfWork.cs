using System.Threading;
using System.Threading.Tasks;

namespace SchulBusserl.Application.Interfaces;

public interface IUnitOfWork
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
