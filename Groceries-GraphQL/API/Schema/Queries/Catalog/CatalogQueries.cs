using API.Schema.Mutations;
using API.Services.Catalog;
using DATA.Models;

namespace API.Schema.Queries.Catalog
{
    [ExtendObjectType(typeof(Query))]
    public class CatalogQueries
    {
        private readonly ICatalogService _catalogService;

        public CatalogQueries(ICatalogService catalogService)
        {
            _catalogService = catalogService;
        }

        public async Task<List<ProductItem>> Catalog([Service] ICatalogService _catalogService)
        {
            return await _catalogService.GetCatalog();
        }
    }
}
