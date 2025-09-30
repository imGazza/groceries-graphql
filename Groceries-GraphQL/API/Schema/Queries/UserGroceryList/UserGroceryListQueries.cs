using API.Records;
using API.Services.UserGroceryList;
using HotChocolate.Authorization;

namespace API.Schema.Queries.UserGroceryList
{
    [ExtendObjectType("Query")]
    public class UserGroceryListQueries
    {
        [Authorize]
        public async Task<List<GroceryListOutput>> UserHistoryGroceryLists(string userId, [Service] IUserGroceryListService _userGroceryListService)
        {
            return await _userGroceryListService.GetUserHistoryGroceryLists(userId);
        }

        [Authorize]
        public async Task<GroceryListOutput> UserDraftGroceryList(string userId, [Service] IUserGroceryListService _userGroceryListService)
        {
            return await _userGroceryListService.GetDraftUserGroceryList(userId);
        }
    }
}
