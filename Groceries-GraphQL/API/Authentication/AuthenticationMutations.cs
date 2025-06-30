using API.Authentication.DTOs;
using DATA.Authentication;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace API.Authentication
{
    public class AuthenticationMutations
    {
        private const int RefreshTokenExpirationDays = 7;

        public async Task RegisterUser
            (
                RegisterInput registerData, 
                [Service] IUserService _userService
            )
        {
            try
            {
                await _userService.CreateUser(registerData);
            }
            catch (Exception ex)
            { 
                throw new GraphQLException("Error during user registration", ex);
            }
        }

        public async Task<LoginOutput> LoginUser
            (
                LoginInput loginData,
                [Service] IUserService _userService,
                [Service] IJwtService _jwtService,
                HttpContext httpContext
            )
        {
            var user = await _userService.GetUserByEmail(loginData.Email);
            ValidateUser(loginData, user, _userService);

            var accessToken = _jwtService.GenerateAccessToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();

            await AddRefreshTokenToUser(user.Id, refreshToken, _userService);
            AddRefreshTokenCookie(httpContext, refreshToken);

            return new LoginOutput()
            {
                AccessToken = accessToken,
                User = user
            };
        }

        private void ValidateUser(LoginInput loginData, User user, IUserService _userService)
        {
            if (user == null || !_userService.IsValidPassword(loginData.Password, user.PasswordHash))
            {
                throw new Exception("Invalid email or password");
            }
            loginData.Password = null; // Clear password ASAP
        }

        private async Task AddRefreshTokenToUser(string userId, string token, IUserService _userService)
        {
            var refreshToken = new RefreshToken
            {
                UserId = userId,
                Token = token,
                ExpiresAt = DateTime.UtcNow.AddDays(RefreshTokenExpirationDays)
            };

            await _userService.AddRefreshToken(refreshToken);
        }

        private void AddRefreshTokenCookie(HttpContext httpContext, string token)
        {
            httpContext.Response.Cookies.Append("refreshToken", token, new CookieOptions()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(RefreshTokenExpirationDays)
            });
        }
    }
}
