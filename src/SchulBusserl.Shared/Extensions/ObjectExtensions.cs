using System;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using SchulBusserl.Shared.Exceptions;
using SchulBusserl.Shared.Guards;

namespace SchulBusserl.Shared.Extensions;

[SuppressMessage("Style", "IDE0060:Remove unused parameter")]
public static class ObjectExtensions
{
    extension<T>(T value) where T : class
    {
        public T? If(bool predicate) => predicate ? value : default;

        public T If(bool predicate, Func<T, T> resultSelector) => predicate ? resultSelector(value) : value;
    }

    extension<TValue>(TValue value) where TValue : notnull
    {
        public TResult Map<TResult>(Func<TValue, TResult> resultSelector) => resultSelector(value);

        public TValue MapIf(bool predicate, Func<TValue, TValue> resultSelector)
        {
            if (predicate)
            {
                return resultSelector(value);
            }

            return value;
        }

        public TValue Apply(Action action)
        {
            action();
            return value;
        }

        public TValue Apply(Action<TValue> action)
        {
            action(value);
            return value;
        }

        public void ThrowIf(bool predicate, Func<Exception> exception)
        {
            if (predicate)
            {
                throw exception();
            }
        }
    }

    extension(object value)
    {
        public T? As<T>() where T : class => value as T;

        public T Cast<T>() => (T)value;
    }

    // ReSharper disable once MoveToExtensionBlock
    public static TValue ThrowIfNull<TValue>([NotNull] this TValue? value, [CallerArgumentExpression("value")] string? parameterName = null) where TValue : notnull
    {
        Guard.Against.Null(value, parameterName);

        return value;
    }

    extension<TValue>([NotNull] TValue? value) where TValue : notnull
    {
        public void ThrowIfNull(Exception exception)
        {
            if (value == null)
            {
                throw exception;
            }
        }
    }

    public static TValue ThrowIfNull<TValue>([NotNull] this TValue? value, [CallerArgumentExpression("value")] string? parameterName = null) where TValue : struct
    {
        Guard.Against.Null(value, parameterName);

        return value.Value;
    }

    // ReSharper disable once MoveToExtensionBlock
    public static TValue ThrowResourceNotFoundExceptionIfNull<TValue>([NotNull] this TValue? value, [CallerArgumentExpression("value")] string? parameterName = null) where TValue : notnull
    {
        if (value == null)
        {
            throw new ResourceNotFoundException($"{parameterName} was null.", $"{parameterName} konnte nicht gefunden werden");
        }

        return value;
    }

    public static ValueTask<TValue> AsValueTask<TValue>(this TValue value) => ValueTask.FromResult(value);
}