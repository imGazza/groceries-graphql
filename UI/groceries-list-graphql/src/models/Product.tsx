export interface Product{
	Id: string;
	Name: string,
	MeasurementUnit: string;
	MeasurementQuantity: number;
	Price: number;
	Image: ProductImage;
}

export interface ProductImage{
	Data: Uint8Array;
	Width: number;
	Height: number;
}