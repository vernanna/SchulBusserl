using System;
using System.Collections;
using System.Linq;
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using SchulBusserl.Shared.Extensions;

namespace SchulBusserl.Serialization;

public class SerializationContractResolver : CamelCasePropertyNamesContractResolver
{
    protected override JsonObjectContract CreateObjectContract(Type objectType)
    {
        var contract = base.CreateObjectContract(objectType);

        // Mark all properties with non-nullable value types as required so that if the property is not provided in the request body
        // an error is returned instead of initializing the property with the default value
        contract.Properties
            .Where(property => property.PropertyType?.IsNonNullableValueType() == true)
            .ForEach(property => property.Required = Required.Always);

        return contract;
    }

    protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
    {
        var property = base.CreateProperty(member, memberSerialization);

        if (typeof(IEnumerable).IsAssignableFrom(property.PropertyType))
        {
            property.TypeNameHandling = TypeNameHandling.None;
        }

        return property;
    }
}