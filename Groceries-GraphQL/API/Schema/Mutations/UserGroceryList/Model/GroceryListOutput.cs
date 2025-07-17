using DATA.Models;

namespace API.Schema.Mutations.UserGroceryList.Model
{
    public class GroceryListOutput
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public decimal TotalPrice { get; set; }
        public GroceryListStatus Status { get; set; } = GroceryListStatus.Draft;
        public DateTime? CompletedAt { get; set; } = null;
        public List<GroceryItem> Items { get; set; } = new List<GroceryItem>();
    }
}
