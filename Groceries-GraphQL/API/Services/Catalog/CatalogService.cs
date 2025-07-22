using API.Projections;
using API.Records;
using API.Services.Shared;
using DATA.Models;
using DATA.Models._Shared;
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

        public async Task<List<ProductItemOutput>> GetCatalog()
        {
            return await _catalogCollection.Find(FilterDefinition<ProductItem>.Empty).Project<ProductItem, ProductItemOutput>().ToListAsync();
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
