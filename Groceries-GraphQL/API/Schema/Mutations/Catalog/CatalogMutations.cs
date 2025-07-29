
using API.Records;
using API.Services.Catalog;

namespace API.Schema.Mutations.Catalog
{
    [ExtendObjectType(typeof(Mutation))]
    public class CatalogMutations
    {           
        public async Task<bool> CreateProduct(ProductInput productInput, IFile productImage, [Service] ICatalogService _catalogService)
        {
            if (productInput == null || productImage == null)
                return false;

            await _catalogService.CreateProduct(productInput, productImage);
            return true;
        }

        public async Task<ProductItemOutput> UpdateProductImage(string productId, IFile productImage, [Service] ICatalogService _catalogService)
        {
            if (string.IsNullOrEmpty(productId) || productImage == null)
                return null;

            return await _catalogService.UpdateProductImage(productId, productImage);
        }

        public async Task<bool> CreateCategory(CategoryInput categoryInput, [Service] ICatalogService _catalogService)
        {
            if (categoryInput == null)
                return false;

            await _catalogService.CreateCategory(categoryInput);
            return true;
        }
    }
}
