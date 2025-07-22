using API.Records;
using DATA.Models;

namespace API.Services.Catalog
{
    public interface ICatalogService
    {
        Task<List<ProductItemOutput>> GetCatalog();
        Task CreateProduct(ProductInput productInput, IFile productImage);
        Task<List<CategoryOutput>> GetCategories();
        Task CreateCategory(CategoryInput categoryInput);
    }
}
