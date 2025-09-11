using API.Projections;
using API.Records;
using API.Services.Shared;
using DATA.Extensions;
using DATA.Models;
using HotChocolate.Data;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace API.Services.Catalog
{
    public class CatalogService : ICatalogService, IInjectableService
    {
        private readonly IMongoCollection<ProductItem> _catalogCollection;
        private readonly IMongoCollection<Category> _categoryCollection;

        public CatalogService(IMongoDatabase database)
        {
            _catalogCollection = database.GetEntityCollection<ProductItem>();
            _categoryCollection = database.GetEntityCollection<Category>();
        }

        public IExecutable<ProductItem> GetCatalog(string searchTerm, string categoryId)
        {
            //var filters = new List<FilterDefinition<ProductItem>>();

            //if (!string.IsNullOrEmpty(searchTerm))
            //{
            //    filters.Add(Builders<ProductItem>.Filter.Regex("Name", new BsonRegularExpression(searchTerm, "i")));
            //}

            //// TODO: Add categoryId to ProductItem entity

            ////if (!string.IsNullOrEmpty(categoryId))
            ////{
            ////    filters.Add(Builders<ProductItem>.Filter.Eq("CategoryId", categoryId));
            ////}

            //var filter = filters.Count > 0
            //    ? Builders<ProductItem>.Filter.And(filters)
            //    : FilterDefinition<ProductItem>.Empty;

            //return _catalogCollection.Find(filter).AsExecutable();

            return _catalogCollection.AsExecutable();
        }

        public async Task CreateProduct(ProductInput productInput, IFile productImage)
        {
            var product = new ProductItem
            {
                Name = productInput.Name,
                MeasurementUnit = productInput.MeasurementUnit,
                MeasurementQuantity = productInput.MeasurementQuantity,
                Price = productInput.Price,
                Image = await ImageManipulation.GenerateProductImage(productImage)
            };

            await _catalogCollection.InsertOneAsync(product);
        }

        public async Task<ProductItemOutput> UpdateProductImage(string productId, IFile productImage)
        {
            var updateDefinition = Builders<ProductItem>.Update
                .Set(gl => gl.Image, await ImageManipulation.GenerateProductImage(productImage));

            return await _catalogCollection.FindOneAndUpdateAsync(
                gl => gl.Id == productId,
                updateDefinition,
                new FindOneAndUpdateOptions<ProductItem, ProductItemOutput> { ReturnDocument = ReturnDocument.After, Projection = ProjectionMappings<ProductItem, ProductItemOutput>.Projection }
            ); 
        }

        public async Task<List<CategoryOutput>> GetCategories()
        {
            return await _categoryCollection.Find(FilterDefinition<Category>.Empty).Project<Category, CategoryOutput>().ToListAsync();
        }

        public async Task CreateCategory(CategoryInput categoryInput)
        {
            var category = new Category
            {
                Name = categoryInput.Name,
                IconName = categoryInput.IconName
            };

            await _categoryCollection.InsertOneAsync(category);
        }
    }
}
