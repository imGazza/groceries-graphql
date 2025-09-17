import ProductsDisplay from "@/components/ui/products-display";
import useCatalog from "@/hooks/use-catalog";
import { useEffect } from "react";
import { useParams } from "react-router";

const ProductsSection = () => {

	const { catalogData, setCategoryQuery } = useCatalog();
	const { categoryId } = useParams();

	useEffect(() => {
		if (categoryId) {
			setCategoryQuery(categoryId)
		}
	}, [categoryId, setCategoryQuery])


	return (
		<div className="min-h-[600px]">
			<ProductsDisplay products={catalogData?.catalog.nodes!} skeletonLoadingQty={18} />
		</div>
	)
}
export default ProductsSection;