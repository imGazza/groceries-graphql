using API.Authentication.DTOs;
using API.Services.Shared;
using DATA.Authentication;
using DATA.Repository;
using System.ComponentModel;

namespace API.Authentication
{
    public class UserService : IUserService, IInjectableService
    {
        private readonly IMongoRepository<User> _userRepository;
        private readonly IMongoRepository<RefreshToken> _refreshTokenRepository;

        public UserService(IMongoRepository<User> userRepository, IMongoRepository<RefreshToken> refreshTokenRepository)
        {
            _userRepository = userRepository;
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _userRepository.FindOne(user => user.Email == email);
        }

        public async Task<User> GetUserById(string id)
        {
            return await _userRepository.FindOne(user => user.Id == id);
        }

        public async Task CreateUser(RegisterInput registerData)
        {
            if(await GetUserByEmail(registerData.Email) != null)
            {
                throw new ArgumentException("User with the same email already exists");
            }

            var user = new User()
            {
                Email = registerData.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerData.Password),
                FirstName = registerData.FirstName,
                LastName = registerData.LastName,
            };
            registerData.Password = null; // Clear password ASAP

            await _userRepository.InsertOne(user);
        }

        public bool IsValidPassword(string password, string userPasswordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, userPasswordHash);
        }

        public async Task AddRefreshToken(RefreshToken refreshToken)
        {
            await _refreshTokenRepository.InsertOne(refreshToken);
        }

        public async Task<bool> IsRefreshTokenValid(string userId, string token)
        {
            var refreshToken = await GetValidRefreshToken(userId, token);
            return refreshToken != null;
        }

        public async Task RevokeRefreshToken(string userId, string token)
        {
            var refreshToken = await GetValidRefreshToken(userId, token);

            if(refreshToken != null)
            {
                refreshToken.IsRevoked = true;
                await _refreshTokenRepository.UpdateOne(refreshToken);
            }
        }

        private async Task<RefreshToken> GetValidRefreshToken(string userId, string token)
        {
            return await _refreshTokenRepository.FindOne(rt => rt.UserId == userId && rt.Token == token && !rt.IsRevoked && rt.ExpiresAt > DateTime.UtcNow);
        }
    }
}
