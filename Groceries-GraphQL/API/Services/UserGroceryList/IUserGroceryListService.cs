using API.Records;
using DATA.Models;

namespace API.Services.UserGroceryList
{
    public interface IUserGroceryListService
    {
        Task<List<GroceryListOutput>> GetUserGroceryLists(string userId);
        Task<GroceryList> CreateUserGroceryList(GroceryListInput groceryListInput, string userId);
    }
}
