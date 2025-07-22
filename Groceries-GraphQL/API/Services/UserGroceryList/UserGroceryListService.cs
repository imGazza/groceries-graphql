using API.Records;
using API.Services.Shared;
using DATA.Models;
using DATA.Models._Shared;
using MongoDB.Driver;

namespace API.Services.UserGroceryList
{
    public class UserGroceryListService : IUserGroceryListService, IInjectableService
    {
        private readonly IMongoCollection<GroceryList> _groceryListCollection;

        public UserGroceryListService(IMongoDatabase database)
        {
            _groceryListCollection = database.GetEntityCollection<GroceryList>();
        }

        public async Task<List<GroceryListOutput>> GetUserGroceryLists(string userId)
        {
            var projection = Builders<GroceryList>.Projection.As<GroceryListOutput>();

            return await _groceryListCollection.Find(x => x.UserId == userId).Project(projection).ToListAsync();
        }

        public async Task<GroceryList> CreateUserGroceryList(GroceryListInput groceryListInput, string userId)
        {
            ValidateGroceryListInput(groceryListInput);

            var groceryList = new GroceryList
            {
                UserId = userId,
                TotalPrice = CalculateTotalPrice(groceryListInput.Items),
                Items = groceryListInput.Items,
                Status = GroceryListStatus.Draft
            };

            await _groceryListCollection.InsertOneAsync(groceryList);
            return groceryList;
        }

        public async Task<GroceryListOutput> UpdateGroceryListProducts(GroceryListUpdateInput groceryListUpdateInput)
        {            
            var updateDefinition = Builders<GroceryList>.Update
                .Set(gl => gl.Items, groceryListUpdateInput.Items)
                .Set(gl => gl.TotalPrice, CalculateTotalPrice(groceryListUpdateInput.Items));

            var projection = Builders<GroceryList>.Projection.As<GroceryListOutput>();

            return await _groceryListCollection.FindOneAndUpdateAsync(
                gl => gl.Id == groceryListUpdateInput.GroceryListId,
                updateDefinition,
                new FindOneAndUpdateOptions<GroceryList, GroceryListOutput> { ReturnDocument = ReturnDocument.After, Projection = projection }
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
