using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using SchulBusserl.Serialization;

namespace SchulBusserl.Extensions;

public static class JsonSerializerSettingsExtensions
{
    extension(JsonSerializerSettings settings)
    {
        public JsonSerializerSettings Configure() =>
            settings
                .WithConverter(new StringEnumConverter())
                .WithTypeNameHandling(TypeNameHandling.Auto)
                .WithContractResolver(new SerializationContractResolver())
                .WithSerializationBinder(new TypeNameSerializationBinder(typeof(AssemblyMarker).Assembly))
                .WithDateTimeZoneHandling(DateTimeZoneHandling.Local);

        public JsonSerializerSettings WithConverter(JsonConverter converter) => settings.Configure(s => s.Converters.Add(converter));

        public JsonSerializerSettings WithTypeNameHandling(TypeNameHandling typeNameHandling) => settings.Configure(s => s.TypeNameHandling = typeNameHandling);

        public JsonSerializerSettings WithContractResolver(IContractResolver contractResolver) => settings.Configure(s => s.ContractResolver = contractResolver);

        public JsonSerializerSettings WithSerializationBinder(ISerializationBinder serializationBinder) => settings.Configure(s => s.SerializationBinder = serializationBinder);

        public JsonSerializerSettings WithDateTimeZoneHandling(DateTimeZoneHandling dateTimeZoneHandling) => settings.Configure(s => s.DateTimeZoneHandling = dateTimeZoneHandling);

        private JsonSerializerSettings Configure(Action<JsonSerializerSettings> configure)
        {
            configure(settings);

            return settings;
        }
    }
}