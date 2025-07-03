using API.Authentication;
using API.Schema.Mutations.Authentication.Models;
using System.Security.Claims;

namespace API.Schema.Queries
{
    public class Query
    {
        public async Task<UserInfo> Me([Service] IUserService _userService, ClaimsPrincipal claimsPrincipal)
        {
            var userId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userService.GetUserById(userId);

            return new UserInfo()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                RegisteredAt = user.CreatedAt
            };
        }
    }
}
