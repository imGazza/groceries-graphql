import { Button } from "@/components/ui/button";
import ProductsDisplay from "@/components/ui/products-display";
import useCatalog from "@/hooks/use-catalog";

interface ProductsSectionProps{
	searchTerm?: string // TODO: create a structure for filters based on category and name
}

const ProductsSection = ({ searchTerm }: ProductsSectionProps) => {


	//const {data: catalogData} = useQuery(GET_CATALOG);
	const { catalogData, setSearchTermQuery, setCategoryQuery, refetch } = useCatalog();

	const testSearch = () => {
		setSearchTermQuery('Ba');
	}

	return (
		<div>
			<Button onClick={testSearch}>Test search</Button>
			<Button onClick={() => refetch()}>Test search</Button>
			<ProductsDisplay products={catalogData?.catalog.nodes!} skeletonLoadingQty={18} />
		</div>
	)
}
export default ProductsSection;

