using DATA.Models.Shared;
using DATA.Shared;
using MongoDB.Driver;
using System.Linq.Expressions;

namespace DATA.Repository
{
    public interface IMongoRepository<T> where T : IEntity
    {
        IQueryable<T> AsQueryable();
        Task InsertOne(T entity);
        Task<T> FindOne(Expression<Func<T, bool>> filter);
        Task UpdateOne(T entity);
    }

    public class MongoRepository<T> : IMongoRepository<T> where T : IEntity
    {
        private readonly IMongoCollection<T> _collection;

        public IQueryable<T> AsQueryable()
        {
            return _collection.AsQueryable();
        }

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

        public async Task InsertOne(T entity)
        {
            entity.CreatedAt = DateTime.Now;
            await _collection.InsertOneAsync(entity);
        }

        public async Task<T> FindOne(Expression<Func<T, bool>> filter)
        {
            return (await _collection.FindAsync(filter)).FirstOrDefault();
        }

        public async Task UpdateOne(T entity)
        {
            entity.UpdatedAt = DateTime.Now;
            await _collection.ReplaceOneAsync(x => x.Id == entity.Id, entity);
        }
    }
}
