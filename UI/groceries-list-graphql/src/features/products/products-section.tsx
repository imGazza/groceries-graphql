import ProductsDisplay from "@/components/ui/products-display";
import { GET_CATALOG } from "@/http/catalog";
import { useQuery } from "@apollo/client"

interface ProductsSectionProps{
	filter?: string // TODO: create a structure for filters based on category and name
}

const ProductsSection = ({ filter }: ProductsSectionProps) => {


	const {data: catalogData} = useQuery(GET_CATALOG);

	return (
		<div>
			<ProductsDisplay products={catalogData?.catalog!} skeletonLoadingQty={18} />
		</div>
	)
}
export default ProductsSection;

