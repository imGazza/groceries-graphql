using API.Projections;
using API.Records;
using API.Services.Shared;
using DATA.Extensions;
using DATA.Models;
using GreenDonut.Data;
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

        public async Task<List<GroceryListOutput>> GetUserHistoryGroceryLists(string userId)
        {
            return await _groceryListCollection.Find(gl => gl.UserId == userId && gl.Status != GroceryListStatus.Draft).SortByDescending(gl => gl.CompletedAt).Project<GroceryList, GroceryListOutput>().ToListAsync();
        }

        public async Task<GroceryListOutput> GetDraftUserGroceryList(string userId)
        {
            var draftList = await _groceryListCollection.Find(gl => gl.UserId == userId && gl.Status == GroceryListStatus.Draft).Project<GroceryList, GroceryListOutput>().SingleOrDefaultAsync();

            return draftList ?? await CreateUserGroceryList(userId);
        }

        private async Task<GroceryListOutput> CreateUserGroceryList(string userId)
        {
            var groceryList = new GroceryList
            {
                UserId = userId,
                TotalPrice = 0,
                Items = new List<GroceryItem>(),
                Status = GroceryListStatus.Draft
            };

            await _groceryListCollection.InsertOneAsync(groceryList);
            return new GroceryListOutput(groceryList.Id, groceryList.UserId, groceryList.TotalPrice, groceryList.Status, groceryList.CompletedAt, groceryList.Items);            
        }

        public async Task<GroceryListOutput> AddGroceryItem(GroceryItem item, string groceryListId)
        {
            var updateDefinition = Builders<GroceryList>.Update
                .AddToSet(gl => gl.Items, item)
                .Inc(gl => gl.TotalPrice, item.Quantity * item.UnitPrice); // Quantity should always be one when adding a new item

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

        public async Task<GroceryListOutput> CompleteGroceryList(string groceryListId, string userId)
        {
            var updateDefinition = Builders<GroceryList>.Update
                .Set(gl => gl.Status, GroceryListStatus.Completed)
                .Set(gl => gl.CompletedAt, DateTime.Now);

            await _groceryListCollection.UpdateOneAsync(
                gl => gl.Id == groceryListId && gl.Status == GroceryListStatus.Draft,
                updateDefinition
            );

            return await CreateUserGroceryList(userId);
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
