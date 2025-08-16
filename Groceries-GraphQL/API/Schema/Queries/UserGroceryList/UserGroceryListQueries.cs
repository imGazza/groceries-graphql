using API.Records;
using API.Services.UserGroceryList;
using HotChocolate.Authorization;

namespace API.Schema.Queries.UserGroceryList
{
    [ExtendObjectType("Query")]
    public class UserGroceryListQueries
    {
        public async Task<List<GroceryListOutput>> UserGroceryLists(string userId, [Service] IUserGroceryListService _userGroceryListService)
        {
            return await _userGroceryListService.GetUserGroceryLists(userId);
        }

        [Authorize]
        public async Task<GroceryListOutput> UserDraftGroceryList(string userId, [Service] IUserGroceryListService _userGroceryListService)
        {
            return await _userGroceryListService.GetDraftUserGroceryList(userId);
        }
    }
}
