using API.Projections;
using API.Schema.Mutations.UserGroceryList.Model;
using API.Services.Shared;
using DATA.Models;
using DATA.Repository;
using MongoDB.Driver;

namespace API.Services.UserGroceryList
{
    public class UserGroceryListService : IUserGroceryListService, IInjectableService
    {
        private readonly IMongoRepository<GroceryList> _groceryListRepository;

        public UserGroceryListService(IMongoRepository<GroceryList> groceryListRepository)
        {
            _groceryListRepository = groceryListRepository;
        }

        public async Task<List<GroceryListOutput>> GetUserGroceryLists(string userId)
        {
            return await _groceryListRepository.FilterAndProject(x => x.UserId == userId, GroceryListOutputProjection.Project());
        }

        public async Task<GroceryList> CreateUserGroceryList(GroceryListInput groceryListInput, string userId)
        {
            ValidateGroceryListInput(groceryListInput);

            var groceryList = new GroceryList
            {
                UserId = userId,
                TotalPrice = CalculateTotalPrice(groceryListInput.Items),
                Items = groceryListInput.Items
            };

            return await _groceryListRepository.InsertOne(groceryList);            
        }

        public async Task<GroceryListOutput> UpdateGroceryListProducts(GroceryUpdateProductsInput groceryUpdateProducts)
        {
            // Anti-pattern: keeping the update definition here to avoid creating custom repositories for each entity
            // Could be resolved calling ReplaceOne intead of UpdateOne, but it would require fetching the whole entity first
            var updateDefinition = Builders<GroceryList>.Update
                .Set(gl => gl.Items, groceryUpdateProducts.Items)
                .Set(gl => gl.TotalPrice, CalculateTotalPrice(groceryUpdateProducts.Items));

            return await _groceryListRepository.UpdateOne(
                gl => gl.Id == groceryUpdateProducts.GroceryListId,
                updateDefinition,
                GroceryListOutputProjection.Project()
            );
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

        private decimal CalculateTotalPrice(List<GroceryItem> groceryItems)
        {
            return groceryItems.Sum(item => item.Quantity * item.UnitPrice);
        }
    }
}
