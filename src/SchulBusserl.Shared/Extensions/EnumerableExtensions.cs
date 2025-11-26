using System;
using System.Collections.Generic;
using System.Linq;

namespace SchulBusserl.Shared.Extensions;

public static class EnumerableExtensions
{
    public static IReadOnlyCollection<TSource> ForEach<TSource>(this IEnumerable<TSource> source, Action<TSource> action)
    {
        var items = source.ToReadOnlyCollection();
        foreach (var item in items)
        {
            action(item);
        }

        return items;
    }

    public static IReadOnlyCollection<TSource> ToReadOnlyCollection<TSource>(this IEnumerable<TSource> source) => source.ToList();

    public static IEnumerable<TSource> WhereNotNull<TSource>(this IEnumerable<TSource?> source) where TSource : class =>
        source
            .Where(item => item != null)
            .Select(item => item!);
}