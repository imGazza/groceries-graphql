using DATA.Models;
using HotChocolate.Types.Pagination;

namespace API.Schema.Queries.Catalog
{
    public class Page
    {
        public string StartCursor { get; set; }
        public string EndCursor { get; set; }
        public bool HasNextPage { get; set; }
        public bool HasPreviousPage { get; set; }
        public int PageSize { get; set; } = 10;
        public int PageCount { get; set; }
        public int TotalCount { get; set; }
    }

    [ExtendObjectType("CatalogConnection")]
    public class CatalogConnectionExtensions
    {
        public Page Page([Parent] Connection<ProductItem> connection)
        {
            var page = new Page
            {
                StartCursor = connection.Info.StartCursor,
                EndCursor = connection.Info.EndCursor,
                HasNextPage = connection.Info.HasNextPage,
                HasPreviousPage = connection.Info.HasPreviousPage,
                TotalCount = connection.TotalCount
            };
            page.PageCount = connection.TotalCount > 0 ? (int)Math.Ceiling((double)connection.TotalCount / page.PageSize) : 0;

            return page;
        }
    }
}
