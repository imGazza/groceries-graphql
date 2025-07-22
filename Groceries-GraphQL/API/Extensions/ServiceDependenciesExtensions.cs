using API.Services.Shared;
using MongoDB.Driver;

namespace API.Extensions
{
    public static class ServiceDependenciesExtensions
    {
        public static WebApplicationBuilder AddMongoDBClient(this WebApplicationBuilder builder)
        {
            builder.Services.AddSingleton<IMongoClient>(sp =>
            {
                var connectionString = builder.Configuration.GetConnectionString("MongoDB");
                return new MongoClient(connectionString);
            });
            return builder;
        }

        public static WebApplicationBuilder AddMongoDBDatabase(this WebApplicationBuilder builder)
        {
            builder.Services.AddSingleton<IMongoDatabase>(sp =>
            {
                var client = sp.GetRequiredService<IMongoClient>();
                return client.GetDatabase("GroceriesGraphQLDatabase");
            });
            return builder;
        }

        // Scrutor extension to register all services that implement IInjectableService
        public static WebApplicationBuilder AddServices(this WebApplicationBuilder builder)
        {
            builder.Services.Scan(scan => scan
                .FromAssemblyOf<Program>()
                .AddClasses(classes => classes.AssignableTo<IInjectableService>())
                .AsImplementedInterfaces()
                .WithScopedLifetime());

            return builder;
        }
    }
}
