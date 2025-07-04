namespace API.Schema.Mutations.Catalog.Models
{
    public class ProductInput
    {
        public string Name { get; set; }
        public string MeasurementUnit { get; set; }
        public int MeasurementQuantity { get; set; }
        public decimal Price { get; set; }
    }
}
