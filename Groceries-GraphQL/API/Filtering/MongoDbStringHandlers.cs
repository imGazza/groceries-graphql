using HotChocolate.Data.Filters;
using HotChocolate.Data.MongoDb;
using HotChocolate.Data.MongoDb.Filters;
using HotChocolate.Execution.Configuration;
using HotChocolate.Language;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text.RegularExpressions;

namespace API.Test
{
    public static class CustomMongoDbDataRequestBuilderExtensions
    {
        public static IRequestExecutorBuilder AddCustomMongoDbFiltering(
        this IRequestExecutorBuilder builder) =>
        builder.ConfigureSchema(s => s.AddCustomMongoDbFiltering());
    }

    public static class CustomMongoDbSchemaBuilderExtensions
    {
        public static ISchemaBuilder AddCustomMongoDbFiltering(
        this ISchemaBuilder builder) =>
        builder.AddFiltering(x => x.AddCustomMongoDbDefaults());
    }

    public static class CustomMongoDbFilterConventionDescriptorExtensions
    {        
        public static IFilterConventionDescriptor AddCustomMongoDbDefaults(
        this IFilterConventionDescriptor descriptor) =>
        descriptor.AddDefaultMongoDbOperations().BindDefaultMongoDbTypes().UseCustomMongoDbProvider();
    }

    public static class CustomMongoDbFilterProvider
    {
        public static IFilterConventionDescriptor UseCustomMongoDbProvider(this IFilterConventionDescriptor descriptor) =>        
            descriptor.Provider(new MongoDbFilterProvider(x => x
                .AddFieldHandler<CaseInsensitiveStringContainsHandler>()
                .AddDefaultMongoDbFieldHandlers()));        
    }

    public class CaseInsensitiveStringContainsHandler : MongoDbStringContainsHandler
    {
        public CaseInsensitiveStringContainsHandler(InputParser inputParser)
        : base(inputParser)
        {
            CanBeNull = false;
        }

        protected override int Operation => DefaultFilterOperations.Contains;

        public override MongoDbFilterDefinition HandleOperation(
            MongoDbFilterVisitorContext context,
            IFilterOperationField field,
            IValueNode value,
            object? parsedValue)
        {
            if (parsedValue is string searchTerm)
            {
                var doc = new MongoDbFilterOperation(
                    "$regex",
                    new BsonRegularExpression($"/{Regex.Escape(searchTerm)}/i"));

                var path = context.GetMongoFilterScope().GetPath();
                return new MongoDbFilterOperation(path, doc);
            }

            return base.HandleOperation(context, field, value, parsedValue);
        }
    }
}
