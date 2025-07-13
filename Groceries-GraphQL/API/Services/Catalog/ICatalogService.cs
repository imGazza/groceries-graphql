using API.Schema.Mutations.Catalog.Models;
using DATA.Models;

namespace API.Services.Catalog
{
    public interface ICatalogService
    {
        Task<List<ProductItem>> GetCatalog();
        Task CreateProduct(ProductInput productInput, IFile productImage);
        Task<List<CategoryOutput>> GetCategories();
        Task CreateCategory(CategoryInput categoryInput);
    }
}
