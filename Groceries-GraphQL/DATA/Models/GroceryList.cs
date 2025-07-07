using DATA.Models.Shared;
using DATA.Shared;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DATA.Models
{
    [BsonCollection("groceryLists")]
    public class GroceryList : Entity
    {        
        public string UserId { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime? CompletedAt { get; set; } = null;
        public List<GroceryItem> Items { get; set; } = new List<GroceryItem>();
    }

    public class GroceryItem
    {
        public string ProductItemId { get; set; }
        public string ProductItemName { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public DateTime? AddedAt { get; set; } = DateTime.Now;
    }
}
