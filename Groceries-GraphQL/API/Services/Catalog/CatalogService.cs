using API.Schema.Mutations.Catalog.Models;
using API.Services.Shared;
using DATA.Models;
using DATA.Repository;
using MongoDB.Driver.Linq;

namespace API.Services.Catalog
{
    public class CatalogService : ICatalogService, IInjectableService
    {
        private readonly IMongoRepository<ProductItem> _catalogRepository;
        private readonly IMongoRepository<Category> _categoryRepository;

        public CatalogService
            (
                IMongoRepository<ProductItem> catalogRepository,
                IMongoRepository<Category> categoryRepository
            )
        {
            _catalogRepository = catalogRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task<List<ProductItem>> GetCatalog()
        {
            return await _catalogRepository.AsQueryable().ToListAsync();
        }

        public async Task CreateProduct(ProductInput productInput, IFile productImage)
        {
            var product = new ProductItem()
            {
                Name = productInput.Name,
                MeasurementUnit = productInput.MeasurementUnit,
                MeasurementQuantity = productInput.MeasurementQuantity,
                Price = productInput.Price,
                Image = await ImageManipulation.GenerateProductImage(productImage)
            };

            await _catalogRepository.InsertOne(product);
        }

        public async Task<List<CategoryOutput>> GetCategories()
        {
            return await _categoryRepository.GetAllAndProject(c => new CategoryOutput
            {
                Id = c.Id,
                Name = c.Name,
                IconName = c.IconName
            });
        }

        public async Task CreateCategory(CategoryInput categoryInput)
        {
            var category = new Category
            {
                Name = categoryInput.Name,
                IconName = categoryInput.IconName
            };
            await _categoryRepository.InsertOne(category);
        }
    }
}
