using API.Schema.Mutations.Catalog.Models;
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

        public async Task<bool> CreateCategory(CategoryInput categoryInput, [Service] ICatalogService _catalogService)
        {
            if (categoryInput == null)
                return false;

            await _catalogService.CreateCategory(categoryInput);
            return true;
        }
    }
}
