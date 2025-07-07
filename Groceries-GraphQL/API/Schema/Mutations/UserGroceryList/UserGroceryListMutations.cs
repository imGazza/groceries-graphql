using API.Schema.Mutations.UserGroceryList.Model;
using API.Services.UserGroceryList;
using DATA.Models;
using HotChocolate.Authorization;
using System.Security.Claims;

namespace API.Schema.Mutations.UserGroceryList
{
    [ExtendObjectType(typeof(Mutation))]
    public class UserGroceryListMutations
    {
        [Authorize]
        public async Task<bool> CreateUserGroceryList(GroceryListInput groceryListInput, [Service] IUserGroceryListService _userGroceryListService, ClaimsPrincipal claimsPrincipal)
        {
            var userId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            await _userGroceryListService.CreateUserGroceryList(groceryListInput, userId);
            return true;
        }
    }
}
