import ProductsDisplay from "@/components/ui/products-display";
import useCatalog from "@/hooks/use-catalog";
import { useEffect } from "react";
import {  useSearchParams } from "react-router";

const ProductsSection = () => {

	const { catalogData, setCategoryQuery, setSearchTermQuery } = useCatalog();
	const [ searchParams ] = useSearchParams();

	useEffect(() => {
		const categoryId = searchParams.get('categoryId');
		const searchTerm = searchParams.get('search');
		if (categoryId) {
			setCategoryQuery(categoryId)
		}
		if(searchTerm){
			setSearchTermQuery(searchTerm);
		}
	}, [searchParams, setCategoryQuery])

	return (
		<div className="min-h-[800px]">
			<ProductsDisplay products={catalogData?.catalog.nodes!} skeletonLoadingQty={18} />
		</div>
	)
}
export default ProductsSection;