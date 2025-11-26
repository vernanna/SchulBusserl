using System;
using System.Linq;
using System.Reflection;
using Newtonsoft.Json.Serialization;

namespace SchulBusserl.Serialization;

public class TypeNameSerializationBinder(Assembly assembly) : ISerializationBinder
{
    public Type BindToType(string? assemblyName, string typeName) => assembly.GetTypes().Single(type => type.Name == typeName);

    public void BindToName(Type serializedType, out string? assemblyName, out string? typeName)
    {
        assemblyName = null;
        typeName = serializedType.Name;
    }
}