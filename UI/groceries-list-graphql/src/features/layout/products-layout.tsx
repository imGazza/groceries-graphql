import useActiveSection from "@/hooks/use-active-section";
import SearchSection from "../products/search-section";
import { useEffect } from "react";
import ProductsSection from "../products/products-section";

const ProductsLayout = () => {

	const { setActiveSection } = useActiveSection();
	
	useEffect(() => {
		setActiveSection('products');
	}, [setActiveSection]);

	return (
		<>
			<SearchSection />
			<div className="container-wrapper">
				<div className="container">
					<ProductsSection />
				</div>
			</div>
		</>
	)

}
export default ProductsLayout;
