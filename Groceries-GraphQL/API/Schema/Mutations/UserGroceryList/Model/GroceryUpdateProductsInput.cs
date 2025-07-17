using DATA.Models;

namespace API.Schema.Mutations.UserGroceryList.Model
{
    public class GroceryUpdateProductsInput
    {
        public string GroceryListId { get; set; }
        public List<GroceryItem> Items { get; set; }
    }
}
