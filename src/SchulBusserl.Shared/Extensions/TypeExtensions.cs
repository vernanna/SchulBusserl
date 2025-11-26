using System;
using System.Collections.Generic;
using System.Linq;

namespace SchulBusserl.Shared.Extensions;

public static class TypeExtensions
{
    extension(Type type)
    {
        public Type? GetGenericInterface(Type genericInterface) => type.GetInterfaces().SingleOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == genericInterface);

        public IEnumerable<Type> GetBaseTypes() => type.BaseType?.GetBaseTypes().Prepend(type.BaseType) ?? [];

        public Type? GetGenericBaseType(Type genericType) => type.GetBaseTypes().SingleOrDefault(baseType => baseType.IsGenericType && baseType.GetGenericTypeDefinition() == genericType);

        public Type? GetGenericTypeArgument(Type genericType) =>
            genericType.IsInterface
                ? type.GetGenericInterface(genericType)?.GenericTypeArguments.Single()
                : type.GetGenericBaseType(genericType)?.GenericTypeArguments.Single();

        public bool IsNonNullableValueType() => type.IsValueType && Nullable.GetUnderlyingType(type) == null;

        public TAttribute? GetAttribute<TAttribute>() where TAttribute : class => Attribute.GetCustomAttribute(type, typeof(TAttribute)) as TAttribute;
    }
}