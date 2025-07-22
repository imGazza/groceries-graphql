using MongoDB.Driver;

namespace API.Projections
{
    public static class ProjectionMappings<TSource, TOutput> where TOutput : class, IProjectionOutput
    {
        private static ProjectionDefinition<TSource, TOutput> _projection;

        static ProjectionMappings()
        {
            _projection = SetProjection();
        }

        public static ProjectionDefinition<TSource, TOutput> Projection => _projection;

        // For every TOutput property, include the corresponding TSource property in the projection
        private static ProjectionDefinition<TSource, TOutput> SetProjection()
        {
            var builder = Builders<TSource>.Projection;
            var projection = builder.Exclude("_id");

            var outputProperties = typeof(TOutput).GetProperties();

            foreach (var property in outputProperties)
            {
                projection = projection.Include(property.Name);
            }
            return projection;
        }
    }
    public static class FluentProjection
    {
        public static IFindFluent<TSource, TOutput> Project<TSource, TOutput>(
            this IFindFluent<TSource, TSource> fluent)
            where TOutput : class, IProjectionOutput
        {
            return fluent.Project(ProjectionMappings<TSource, TOutput>.Projection);
        }
    }
}
