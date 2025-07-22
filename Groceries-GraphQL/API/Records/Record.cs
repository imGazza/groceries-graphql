using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Records
{
    public record Record([property: BsonId][property: BsonRepresentation(BsonType.ObjectId)] string Id);
}
