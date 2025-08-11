using API.Records;
using DATA.Models;

namespace API.Services.UserGroceryList
{
    public interface IUserGroceryListService
    {
        Task<List<GroceryListOutput>> GetUserGroceryLists(string userId);
        Task<GroceryListOutput> GetDraftUserGroceryLists(string userId);
        Task<GroceryList> CreateUserGroceryList(GroceryListInput groceryListInput, string userId);
        Task<GroceryListOutput> AddGroceryItem(GroceryItem item, string groceryListId);
        Task<GroceryListOutput> DecreaseGroceryItemQuantity(GroceryItem item, string groceryListId);
        Task<GroceryListOutput> IncreaseGroceryItemQuantity(GroceryItem item, string groceryListId);
        Task<GroceryListOutput> RemoveGroceryItem(GroceryItem item, string groceryListId);
    }
}
