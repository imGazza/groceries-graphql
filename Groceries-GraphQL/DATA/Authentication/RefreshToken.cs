using DATA.Models.Shared;
using DATA.Shared;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DATA.Authentication
{
    [BsonCollection("refreshTokens")]
    public class RefreshToken : Entity
    {
        public string Token { get; set; }
        public string UserId { get; set; }
        public bool IsRevoked { get; set; } = false;
        public DateTime ExpiresAt { get; set; }

    }
}
