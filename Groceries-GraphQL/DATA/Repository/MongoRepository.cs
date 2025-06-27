using DATA.Shared;
using MongoDB.Driver;

namespace DATA.Repository
{
    public interface IMongoRepository<T>
    {
        Task InsertOne(T entity);
    }

    public class MongoRepository<T> : IMongoRepository<T>
    {
        private readonly IMongoCollection<T> _collection;

        public MongoRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<T>(GetCollectionName());
        }

        private string GetCollectionName()
        {
            var name = typeof(T).GetCustomAttributes(typeof(BsonCollectionAttribute), true)?.FirstOrDefault();
            if (name != null)
            {
                return ((BsonCollectionAttribute)name).CollectionName;
            }

            throw new ArgumentException("The collection is unknown");
        }

        public virtual async Task InsertOne(T entity)
        {
            await _collection.InsertOneAsync(entity);
        }
    }
}
