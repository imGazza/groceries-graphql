import type { Product } from "@/http/catalog";
import ProductCard, { ProductCardSkeleton } from "./product-card";
import useDraftList from "@/hooks/use-draft-list";
import { getQuantityOfProductInCart } from "@/lib/draft-list-utils";
import { skeletonUniqueId } from "@/lib/utils";

interface ProductDisplayProps {
	products: Product[];
	skeletonLoadingQty: number;
}

const ProductDisplay = ({ products, skeletonLoadingQty = 6 }: ProductDisplayProps) => {

	const { groceryList } = useDraftList();

	if(!groceryList || !products){
		return <ProductDisplaySkeleton skeletonLoadingQty={skeletonLoadingQty} />
	}
	
	return (
		<div className="grid grid-cols-6 gap-4 py-4">
			{
				products?.map(product => (
					<ProductCard key={product.id} product={product} initialQuantity={getQuantityOfProductInCart(product, groceryList)} />
				))
			}
		</div>
	);
}
export default ProductDisplay;

interface ProductDisplaySkeletonProps{
	skeletonLoadingQty: number;
}

const ProductDisplaySkeleton = ({ skeletonLoadingQty }: ProductDisplaySkeletonProps) => {
	return (
		<div className="grid grid-cols-6 gap-4 py-4">
			{
				Array.from({ length: skeletonLoadingQty }).map(() => (
					<ProductCardSkeleton key={skeletonUniqueId()} />
				))
			}
		</div>
	)
}
