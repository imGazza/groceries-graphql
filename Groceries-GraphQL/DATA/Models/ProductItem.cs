using DATA.Models.Shared;
using DATA.Shared;

namespace DATA.Models
{
    [BsonCollection("productItems")]
    public class ProductItem : Entity
    {
        public string Name { get; set; }
        public string MeasurementUnit { get; set; }
        public int MeasurementQuantity { get; set; }
        public decimal Price { get; set; }
        public ProductImage Image { get; set; }
    }

    public class ProductImage
    {
        public byte[] Data { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
    }
}
