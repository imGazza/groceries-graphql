import type { Product } from "@/models/Product";
import { Card, CardTitle } from "./card";

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {

	const imageUrl = URL.createObjectURL(new Blob([product.Image.Data], { type: 'image/jpeg' }));

	return (
		<Card>
			<img src={imageUrl} alt={product.Name} />
			<CardTitle>
				<p>{product.Name}</p>
			</CardTitle>
			
		</Card>
	)
}
export default ProductCard;