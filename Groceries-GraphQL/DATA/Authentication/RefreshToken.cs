using DATA.Models.Shared;

namespace DATA.Authentication
{
    public class RefreshToken : Entity
    {
        public string Token { get; set; }
        public string UserId { get; set; }
        public bool IsRevoked { get; set; } = false;
        public DateTime ExpiresAt { get; set; }

    }
}
