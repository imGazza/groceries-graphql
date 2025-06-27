using DATA.Shared;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DATA.Models
{
    [BsonCollection("refreshTokens")]
    public class RefreshToken
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Token { get; set; }
        public int UserId { get; set; }
        public bool IsRevoked { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime ExpiresAt { get; set; }

    }
}
