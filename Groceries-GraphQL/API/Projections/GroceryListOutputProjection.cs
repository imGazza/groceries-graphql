using API.Schema.Mutations.UserGroceryList.Model;
using DATA.Models;
using System.Linq.Expressions;

namespace API.Projections
{
    public class GroceryListOutputProjection
    {
        public static Expression<Func<GroceryList, GroceryListOutput>> Project()
        {
            return gl => new GroceryListOutput
            {
                Id = gl.Id,
                UserId = gl.UserId,
                TotalPrice = gl.TotalPrice,
                Status = gl.Status,
                CompletedAt = gl.CompletedAt,
                Items = gl.Items
            };
        }
    }
}
