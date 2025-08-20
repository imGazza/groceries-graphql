using API.Records;
using API.Services.Catalog;
using DATA.Models;
using HotChocolate.Authorization;
using HotChocolate.Data;
using HotChocolate.Types.Pagination;

namespace API.Schema.Queries.Catalog
{
    [ExtendObjectType(typeof(Query))]
    public class CatalogQueries
    {
        [Authorize]
        [UsePaging(IncludeTotalCount = true, ConnectionName = "Catalog")]
        [UseProjection]
        public IExecutable<ProductItem> Catalog([Service] ICatalogService _catalogService)
        {
            return _catalogService.GetCatalog();
        }

        public async Task<List<CategoryOutput>> Categories([Service] ICatalogService _catalogService)
        {
            return await _catalogService.GetCategories();
        }
    }
}
