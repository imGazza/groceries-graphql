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

        public CatalogService
            (
                IMongoRepository<ProductItem> catalogRepository
            )
        {
            _catalogRepository = catalogRepository;
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
    }
}
