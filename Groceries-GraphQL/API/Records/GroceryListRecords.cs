using API.Projections;
using DATA.Models;

namespace API.Records
{
    #region Input Records

    public record GroceryListInput(List<GroceryItem> Items);
    public record GroceryListUpdateInput(string GroceryListId, List<GroceryItem> Items);

    #endregion

    #region Output Records

    public record GroceryListOutput(string Id, string UserId, decimal TotalPrice, GroceryListStatus Status, DateTime? CompletedAt, List<GroceryItem> Items): Record(Id), IProjectionOutput;

    #endregion
}
