using API.Schema.Mutations.UserGroceryList.Model;
using DATA.Models;

namespace API.Services.UserGroceryList
{
    public interface IUserGroceryListService
    {
        Task<List<GroceryList>> GetUserGroceryLists(string userId);
        Task CreateUserGroceryList(GroceryListInput groceryListInput, string userId);
    }
}
