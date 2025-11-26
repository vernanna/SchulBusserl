using System;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;

namespace SchulBusserl.Shared.Guards;

[SuppressMessage("Style", "IDE0060:Remove unused parameter")]
public static class GenericGuardExtensions
{
    extension(IGuard guard)
    {
        public void Null<T>([NotNull] T value, [CallerArgumentExpression("value")] string? parameterName = null)
        {
            if (value == null)
            {
                throw new ArgumentNullException(parameterName, $"Required parameter {parameterName} must not be null.");
            }
        }

        public void NotNull<T>(T value, [CallerArgumentExpression("value")] string? parameterName = null)
        {
            if (value != null)
            {
                throw new ArgumentNullException(parameterName, $"Parameter {parameterName} must be null.");
            }
        }

        public void Equal<T>(T firstValue, T secondValue, [CallerArgumentExpression("firstValue")] string? firstParameterName = null, [CallerArgumentExpression("secondValue")] string? secondParameterName = null)
        {
            if (Equals(firstValue, secondValue))
            {
                throw new ArgumentException($"Parameters {firstParameterName} and {secondParameterName} must not be equal.");
            }
        }
    }
}