import H1 from "@/components/ui/h1";
import ProductDisplay from "@/components/ui/product-display";
import { GET_CATALOG } from "@/http/catalog";
import { useQuery } from "@apollo/client";

const LatestProducts = () => {

	const { data } = useQuery(GET_CATALOG);

	return(
		<>
			<H1>Latest products</H1>
			<ProductDisplay catalogData={data!} />
		</>		
	)
}
export default LatestProducts;