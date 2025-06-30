using API.Authentication.DTOs;
using DATA.Authentication;

namespace API.Authentication
{
    public interface IUserService
    {
        Task<User> GetUserByEmail(string email);
        Task<User> GetUserById(string id);
        Task CreateUser(RegisterInput registerData);
        bool IsValidPassword(string password, string userPasswordHash);
        Task AddRefreshToken(RefreshToken refreshToken);
        Task<bool> IsRefreshTokenValid(string userId, string token);
        Task RevokeRefreshToken(string userId, string token);

    }
}
