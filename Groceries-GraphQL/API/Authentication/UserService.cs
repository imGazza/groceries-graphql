using API.Schema.Mutations.Authentication.Models;
using API.Services.Shared;
using DATA.Authentication;
using DATA.Models._Shared;
using MongoDB.Driver;

namespace API.Authentication
{
    public class UserService : IUserService, IInjectableService
    {
        private readonly IMongoCollection<User> _userCollection;
        private readonly IMongoCollection<RefreshToken> _refreshTokenCollection;

        public UserService(IMongoDatabase database)
        {
            _userCollection = database.GetEntityCollection<User>();
            _refreshTokenCollection = database.GetEntityCollection<RefreshToken>();
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _userCollection.Find(user => user.Email == email).SingleOrDefaultAsync();
        }

        public async Task<User> GetUserById(string id)
        {
            return await _userCollection.Find(user => user.Id == id).FirstOrDefaultAsync();
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
                Roles = new List<string> { "User" },
                FirstName = registerData.FirstName,
                LastName = registerData.LastName,
            };
            registerData.Password = null; // Clear password ASAP

            await _userCollection.InsertOneAsync(user);
        }

        public bool IsValidPassword(string password, string userPasswordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, userPasswordHash);
        }

        public async Task AddRefreshToken(RefreshToken refreshToken)
        {
            await _refreshTokenCollection.InsertOneAsync(refreshToken);
        }

        public async Task<bool> IsRefreshTokenValid(string userId, string token)
        {
            return await _refreshTokenCollection.CountDocumentsAsync(FilterValidRefreshToken(userId, token)) > 0;
        }

        public async Task<RefreshToken> RevokeRefreshToken(string userId, string token)
        {
            UpdateDefinition<RefreshToken> update = Builders<RefreshToken>.Update
                .Set(rt => rt.IsRevoked, true);

            return await _refreshTokenCollection.FindOneAndUpdateAsync(
                FilterValidRefreshToken(userId, token),
                update);
        }

        private FilterDefinition<RefreshToken> FilterValidRefreshToken(string userId, string token)
        {
            return Builders<RefreshToken>.Filter.And(
                Builders<RefreshToken>.Filter.Eq(rt => rt.UserId, userId),
                Builders<RefreshToken>.Filter.Eq(rt => rt.Token, token),
                Builders<RefreshToken>.Filter.Eq(rt => rt.IsRevoked, false),
                Builders<RefreshToken>.Filter.Gt(rt => rt.ExpiresAt, DateTime.Now)
            );
        }
    }
}
