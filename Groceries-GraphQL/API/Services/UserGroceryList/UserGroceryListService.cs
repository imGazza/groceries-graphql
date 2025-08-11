using API.Projections;
using API.Records;
using API.Services.Shared;
using DATA.Extensions;
using DATA.Models;
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
            return await _groceryListCollection.Find(gl => gl.UserId == userId).Project<GroceryList, GroceryListOutput>().ToListAsync();
        }

        public async Task<GroceryListOutput> GetDraftUserGroceryLists(string userId)
        {
            return await _groceryListCollection.Find(gl => gl.UserId == userId && gl.Status == GroceryListStatus.Draft).Project<GroceryList, GroceryListOutput>().SingleOrDefaultAsync();
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

        public async Task<GroceryListOutput> AddGroceryItem(GroceryItem item, string groceryListId)
        {
            var updateDefinition = Builders<GroceryList>.Update
                .AddToSet(gl => gl.Items, item)
                .Inc(gl => gl.TotalPrice, item.Quantity * item.UnitPrice); // Qauntity should always be one when adding the new item

            return await _groceryListCollection.FindOneAndUpdateAsync(
                gl => gl.Id == groceryListId,
                updateDefinition,
                new FindOneAndUpdateOptions<GroceryList, GroceryListOutput> { ReturnDocument = ReturnDocument.After, Projection = ProjectionMappings<GroceryList, GroceryListOutput>.Projection }
            );
        }

        public async Task<GroceryListOutput> DecreaseGroceryItemQuantity(GroceryItem item, string groceryListId)
        {
            return await UpdateGroceryItemQuantity(item, groceryListId, -item.UnitPrice);
        }

        public async Task<GroceryListOutput> IncreaseGroceryItemQuantity(GroceryItem item, string groceryListId)
        {
            return await UpdateGroceryItemQuantity(item, groceryListId, item.UnitPrice);
        }

        public async Task<GroceryListOutput> RemoveGroceryItem(GroceryItem item, string groceryListId)
        {
            var updateDefinition = Builders<GroceryList>.Update
                .PullFilter(gl => gl.Items, i => i.ProductItemId == item.ProductItemId)
                .Inc(gl => gl.TotalPrice, -(item.Quantity * item.UnitPrice)); // Remove item total price

            return await _groceryListCollection.FindOneAndUpdateAsync(
                gl => gl.Id == groceryListId,
                updateDefinition,
                new FindOneAndUpdateOptions<GroceryList, GroceryListOutput> { ReturnDocument = ReturnDocument.After, Projection = ProjectionMappings<GroceryList, GroceryListOutput>.Projection }
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

        private async Task<GroceryListOutput> UpdateGroceryItemQuantity(GroceryItem item, string groceryListId, decimal priceChange)
        {
            var filter = GroceryItemFilter(groceryListId, item.ProductItemId);

            var updateDefinition = Builders<GroceryList>.Update
                .Set("Items.$.Quantity", item.Quantity)
                .Inc(gl => gl.TotalPrice, priceChange);

            return await _groceryListCollection.FindOneAndUpdateAsync(
                filter,
                updateDefinition,
                new FindOneAndUpdateOptions<GroceryList, GroceryListOutput> { ReturnDocument = ReturnDocument.After, Projection = ProjectionMappings<GroceryList, GroceryListOutput>.Projection }
            );
        }

        private FilterDefinition<GroceryList> GroceryItemFilter(string groceryListId, string groceryProductId)
        {
            return Builders<GroceryList>.Filter.And(
                Builders<GroceryList>.Filter.Eq(gl => gl.Id, groceryListId),
                Builders<GroceryList>.Filter.ElemMatch(gl => gl.Items, i => i.ProductItemId == groceryProductId)
            );
        }
    }
}
