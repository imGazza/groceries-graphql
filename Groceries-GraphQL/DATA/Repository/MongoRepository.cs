﻿using DATA.Authentication;
using DATA.Models.Shared;
using DATA.Shared;
using MongoDB.Driver;
using System.Linq.Expressions;

namespace DATA.Repository
{
    public interface IMongoRepository<T> where T : IEntity
    {
        IQueryable<T> AsQueryable();
        Task<List<T>> Filter(Expression<Func<T, bool>> filter);
        Task<T> FindOne(Expression<Func<T, bool>> filter);
        Task<T> InsertOne(T entity);
        Task<T> UpdateOne(T entity);
    }

    public class MongoRepository<T> : IMongoRepository<T> where T : IEntity
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

        public IQueryable<T> AsQueryable()
        {
            return _collection.AsQueryable();
        }

        public async Task<List<T>> Filter(Expression<Func<T, bool>> filter)
        {
            return (await _collection.FindAsync(filter)).ToList();
        }

        //TODO: Consider adding a Filter method with projection if needed

        public async Task<T> FindOne(Expression<Func<T, bool>> filter)
        {
            return (await _collection.FindAsync(filter)).SingleOrDefault();
        }

        public async Task<T> InsertOne(T entity)
        {
            entity.CreatedAt = DateTime.Now;
            await _collection.InsertOneAsync(entity);
            return entity;
        }

        public async Task<T> UpdateOne(T entity)
        {
            entity.UpdatedAt = DateTime.Now;
            return await _collection.FindOneAndReplaceAsync(x => x.Id == entity.Id, entity, new FindOneAndReplaceOptions<T> { ReturnDocument = ReturnDocument.After });
        }
    }
}
