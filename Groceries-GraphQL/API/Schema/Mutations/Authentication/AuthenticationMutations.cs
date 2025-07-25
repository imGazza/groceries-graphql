﻿using API.Authentication;
using API.Schema.Mutations.Authentication.Models;
using DATA.Authentication;
using HotChocolate.Authorization;
using System.Security.Claims;

namespace API.Schema.Mutations.Authentication
{
    [ExtendObjectType(typeof(Mutation))]
    public class AuthenticationMutations
    {
        private const int RefreshTokenExpirationDays = 7;

        public async Task<bool> RegisterUser
            (
                RegisterInput registerInput, 
                [Service] IUserService _userService
            )
        {
            try
            {
                await _userService.CreateUser(registerInput);
                return true;
            }
            catch (Exception ex)
            { 
                throw new GraphQLException("Error during user registration", ex);
            }
        }

        public async Task<LoginOutput> LoginUser
            (
                LoginInput loginInput,
                [Service] IUserService _userService,
                [Service] IJwtService _jwtService,
                HttpContext httpContext
            )
        {
            var user = await _userService.GetUserByEmail(loginInput.Email);
            ValidateUser(loginInput, user, _userService);

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

        public async Task<LoginOutput> RefreshToken
            (
                User user,
                [Service] IUserService _userService,
                [Service] IJwtService _jwtService,
                HttpContext httpContext
            )
        {
            var refreshToken = httpContext.Request.Cookies["refreshToken"];

            if (!await _userService.IsRefreshTokenValid(user.Id, refreshToken))
                throw new GraphQLException("Refresh token is invalid");

            string newAccessToken = _jwtService.GenerateAccessToken(user);

            return new LoginOutput()
            {
                AccessToken = newAccessToken,
                User = user
            };
        }

        [Authorize]
        public async Task<bool> Logout
            (
                [Service] IUserService _userService,
                HttpContext httpContext,
                ClaimsPrincipal claimsPrincipal // Injected by GraphQL framework
            )
        {            
            var userId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            var refreshToken = httpContext.Request.Cookies["refreshToken"];

            if (!string.IsNullOrEmpty(userId) || !string.IsNullOrEmpty(refreshToken))
            {
                await _userService.RevokeRefreshToken(userId, refreshToken);
            }

            httpContext.Response.Cookies.Delete("refreshToken");
            return true;
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
                ExpiresAt = DateTime.Now.AddDays(RefreshTokenExpirationDays)
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
                Expires = DateTime.Now.AddDays(RefreshTokenExpirationDays)
            });
        }
    }
}
