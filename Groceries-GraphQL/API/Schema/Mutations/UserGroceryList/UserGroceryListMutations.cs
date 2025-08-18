using API.Records;
using API.Services.UserGroceryList;
using DATA.Models;
using HotChocolate.Authorization;

namespace API.Schema.Mutations.UserGroceryList
{
    [ExtendObjectType(typeof(Mutation))]
    public class UserGroceryListMutations
    {
        [Authorize]
        public async Task<GroceryListOutput> AddItem(GroceryItem item, string groceryListId, [Service] IUserGroceryListService _userGroceryListService)
        {
            return await _userGroceryListService.AddGroceryItem(item, groceryListId);
        }

        [Authorize]
        public async Task<GroceryListOutput> IncreaseQuantity(GroceryItem item, string groceryListId, [Service] IUserGroceryListService _userGroceryListService)
        {
            return await _userGroceryListService.IncreaseGroceryItemQuantity(item, groceryListId);
        }

        [Authorize]
        public async Task<GroceryListOutput> DecreaseQuantity(GroceryItem item, string groceryListId, [Service] IUserGroceryListService _userGroceryListService)
        {
            return await _userGroceryListService.DecreaseGroceryItemQuantity(item, groceryListId);
        }

        [Authorize]
        public async Task<GroceryListOutput> RemoveItem(GroceryItem item, string groceryListId, [Service] IUserGroceryListService _userGroceryListService)
        {
            return await _userGroceryListService.RemoveGroceryItem(item, groceryListId);
        }
    }
}
