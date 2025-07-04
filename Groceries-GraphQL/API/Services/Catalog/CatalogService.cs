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
                Image = IsValidImage(productImage) ? ElaborateProductImage(productImage) : null
            };

            await _catalogRepository.InsertOne(product);
        }

        private bool IsValidImage(IFile file)
        {
            if (file == null || file.Length == 0)
                return false;

            var validContentTypes = new[] { "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp" };
            return validContentTypes.Contains(file.ContentType);
        }

        private ProductImage ElaborateProductImage(IFile file)
        {
            using var memoryStream = new MemoryStream();
            file.CopyToAsync(memoryStream);

            return new ProductImage
            {
                Data = memoryStream.ToArray(),
                ContentType = file.ContentType
            };
        }
    }
}
