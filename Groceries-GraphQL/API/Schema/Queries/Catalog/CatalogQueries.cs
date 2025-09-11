using API.Records;
using API.Services.Catalog;
using DATA.Models;
using HotChocolate.Authorization;
using HotChocolate.Data;
using HotChocolate.Resolvers;

namespace API.Schema.Queries.Catalog
{
    [ExtendObjectType(typeof(Query))]
    public class CatalogQueries
    {
        [UsePaging(IncludeTotalCount = true, ConnectionName = "Catalog")]        
        [UseProjection]
        [UseFiltering]
        public IExecutable<ProductItem> Catalog([Service] ICatalogService _catalogService, string searchTerm = null, string categoryId = null)
        {
            return _catalogService.GetCatalog(searchTerm, categoryId);
        }

        public async Task<List<CategoryOutput>> Categories([Service] ICatalogService _catalogService)
        {
            return await _catalogService.GetCategories();
        }
    }
}
