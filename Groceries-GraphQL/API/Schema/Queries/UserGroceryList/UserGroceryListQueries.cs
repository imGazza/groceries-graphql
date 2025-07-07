using API.Services.UserGroceryList;
using DATA.Models;

namespace API.Schema.Queries.UserGroceryList
{
    [ExtendObjectType("Query")]
    public class UserGroceryListQueries
    {
        public async Task<List<GroceryList>> UserGroceryLists(string userId, [Service] IUserGroceryListService _userGroceryListService)
        {
            return await _userGroceryListService.GetUserGroceryLists(userId);
        }
    }
}
