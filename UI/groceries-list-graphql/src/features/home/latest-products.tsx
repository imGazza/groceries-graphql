import H1 from "@/components/ui/h1";
import ProductsDisplay from "@/components/ui/products-display";
import { GET_LATEST_PRODUCTS } from "@/http/catalog";
import { useQuery } from "@apollo/client";

const LatestProducts = () => {

	const { data: catalogData } = useQuery(GET_LATEST_PRODUCTS, { variables: { first: 6 } });

	return(
		<>
			<H1>Latest products</H1>
			<ProductsDisplay products={catalogData?.catalog.nodes!} skeletonLoadingQty={6} />
		</>		
	)
}
export default LatestProducts;