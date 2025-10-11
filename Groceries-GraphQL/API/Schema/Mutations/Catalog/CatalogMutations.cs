
using API.Records;
using API.Services.Catalog;
using HotChocolate.Authorization;

namespace API.Schema.Mutations.Catalog
{
    [ExtendObjectType(typeof(Mutation))]
    public class CatalogMutations
    {
        [Authorize]
        public async Task<bool> CreateProduct(ProductInput productInput, IFile productImage, [Service] ICatalogService _catalogService)
        {
            if (productInput == null || productImage == null)
                return false;

            await _catalogService.CreateProduct(productInput, productImage);
            return true;
        }

        [Authorize]
        public async Task<ProductItemOutput> UpdateProductImage(string productId, IFile productImage, [Service] ICatalogService _catalogService)
        {
            if (string.IsNullOrEmpty(productId) || productImage == null)
                return null;

            return await _catalogService.UpdateProductImage(productId, productImage);
        }

        [Authorize]
        public async Task<bool> CreateCategory(CategoryInput categoryInput, [Service] ICatalogService _catalogService)
        {
            if (categoryInput == null)
                return false;

            await _catalogService.CreateCategory(categoryInput);
            return true;
        }
    }
}
