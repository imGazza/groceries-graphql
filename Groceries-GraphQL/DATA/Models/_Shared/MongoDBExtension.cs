using DATA.Models.Shared;
using Humanizer;
using MongoDB.Driver;

namespace DATA.Models._Shared
{
    public static class MongoDBExtension
    {
        public static IMongoCollection<T> GetEntityCollection<T>(this IMongoDatabase mongoDatabase) where T : Entity
        {
            string collectionName = typeof(T).Name.Pluralize();
            return mongoDatabase.GetCollection<T>(collectionName);
        }
    }
}
