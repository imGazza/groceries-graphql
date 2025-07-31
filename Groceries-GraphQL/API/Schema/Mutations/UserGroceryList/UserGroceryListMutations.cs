using API.Records;
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
        public async Task<GroceryList> CreateUserGroceryList(GroceryListInput groceryListInput, [Service] IUserGroceryListService _userGroceryListService, ClaimsPrincipal claimsPrincipal)
        {
            var userId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _userGroceryListService.CreateUserGroceryList(groceryListInput, userId);
        }

        public async Task<GroceryListOutput> AddItem(GroceryItem item, string groceryListId, [Service] IUserGroceryListService _userGroceryListService)
        {
            return await _userGroceryListService.AddGroceryItem(item, groceryListId);
        }

        public async Task<GroceryListOutput> IncreaseQuantity(GroceryItem item, string groceryListId, [Service] IUserGroceryListService _userGroceryListService)
        {
            return await _userGroceryListService.IncreaseGroceryItemQuantity(item, groceryListId);
        }

        public async Task<GroceryListOutput> DecreaseQuantity(GroceryItem item, string groceryListId, [Service] IUserGroceryListService _userGroceryListService)
        {
            return await _userGroceryListService.DecreaseGroceryItemQuantity(item, groceryListId);
        }

        public async Task<GroceryListOutput> RemoveItem(GroceryItem item, string groceryListId, [Service] IUserGroceryListService _userGroceryListService)
        {
            return await _userGroceryListService.RemoveGroceryItem(item, groceryListId);
        }
    }
}
