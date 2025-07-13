using API.Schema.Mutations;
using API.Schema.Mutations.Catalog.Models;
using API.Services.Catalog;
using DATA.Models;

namespace API.Schema.Queries.Catalog
{
    [ExtendObjectType(typeof(Query))]
    public class CatalogQueries
    {
        public async Task<List<ProductItem>> Catalog([Service] ICatalogService _catalogService)
        {
            return await _catalogService.GetCatalog();
        }

        public async Task<List<CategoryOutput>> Categories([Service] ICatalogService _catalogService)
        {
            return await _catalogService.GetCategories();
        }
    }
}
