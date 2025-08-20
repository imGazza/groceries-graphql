using API.Records;
using DATA.Models;

namespace API.Services.Catalog
{
    public interface ICatalogService
    {
        IExecutable<ProductItem> GetCatalog();
        Task CreateProduct(ProductInput productInput, IFile productImage);
        Task<ProductItemOutput> UpdateProductImage(string productId, IFile productImage);
        Task<List<CategoryOutput>> GetCategories();
        Task CreateCategory(CategoryInput categoryInput);
    }
}
