import type { CatalogData } from "@/http/catalog";
import ProductCard from "./product-card";

interface ProductDisplayProps {
	catalogData: CatalogData;
}

const ProductDisplay = ({ catalogData }: ProductDisplayProps) => {
	return (
		<div className="grid grid-cols-6 gap-4 py-4">
			{
				catalogData?.catalog.map(product => (
					<ProductCard key={product.id} product={product} />
				))
			}
		</div>
	)
}
export default ProductDisplay;