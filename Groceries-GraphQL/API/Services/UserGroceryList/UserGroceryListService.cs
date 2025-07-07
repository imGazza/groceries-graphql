using API.Schema.Mutations.UserGroceryList.Model;
using API.Services.Shared;
using DATA.Models;
using DATA.Repository;

namespace API.Services.UserGroceryList
{
    public class UserGroceryListService : IUserGroceryListService, IInjectableService
    {
        private readonly IMongoRepository<GroceryList> _userGroceryListRepository;

        public UserGroceryListService(IMongoRepository<GroceryList> userGroceryListRepository)
        {
            _userGroceryListRepository = userGroceryListRepository;
        }

        public async Task<List<GroceryList>> GetUserGroceryLists(string userId)
        {
            return await _userGroceryListRepository.Filter(x => x.UserId == userId);
        }

        public async Task CreateUserGroceryList(GroceryListInput groceryListInput, string userId)
        {
            ValidateGroceryListInput(groceryListInput);

            var groceryList = new GroceryList
            {
                UserId = userId,
                TotalPrice = CalculateTotalPrice(),
                Items = groceryListInput.Items
            };

            await _userGroceryListRepository.InsertOne(groceryList);

            decimal CalculateTotalPrice()
            {
                return groceryListInput.Items.Sum(item => item.Quantity * item.UnitPrice);
            }
        }

        private void ValidateGroceryListInput(GroceryListInput groceryListInput)
        {
            if (groceryListInput == null || !groceryListInput.Items.Any())
                throw new ArgumentNullException(nameof(groceryListInput), "Invalid grocery list");

            foreach (var item in groceryListInput.Items)
            {
                if (item.Quantity <= 0)
                    throw new ArgumentException($"{item.ProductItemName}: item quantity must be greater than zero");

                if (item.UnitPrice < 0)
                    throw new ArgumentException($"{item.ProductItemName}: negative unit price");
            }
        }
    }
}
