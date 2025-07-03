using DATA.Models.Shared;
using DATA.Shared;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DATA.Authentication
{
    [BsonCollection("users")]
    public class User : Entity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; } = new List<string>();
    }
}
