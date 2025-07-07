using DATA.Models;

namespace API.Schema.Mutations.UserGroceryList.Model
{
    public class GroceryListInput
    {
        public List<GroceryItem> Items { get; set; } = new List<GroceryItem>();
    }
}
