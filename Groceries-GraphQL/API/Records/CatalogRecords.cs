using API.Projections;
using DATA.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Records
{
    #region Input Records

    public record ProductInput(string Name, string MeasurementUnit, int MeasurementQuantity, decimal Price);
    public record CategoryInput(string Name, string IconName);

    #endregion

    #region Output Records

    public record ProductItemOutput(string Id, string Name, string MeasurementUnit, int MeasurementQuantity, decimal Price, ProductImage Image): Record(Id), IProjectionOutput;
    public record CategoryOutput(string Id, string Name, string IconName): Record(Id), IProjectionOutput;

    #endregion
}
