import useActiveSection from "@/hooks/use-active-section";
import SearchSection from "../products/search-section";
import { useEffect } from "react";
import ProductsSection from "../products/products-section";
import CatalogProvider from "@/provider/catalog/catalog-provider";

const ProductsLayout = () => {

	const { setActiveSection } = useActiveSection();	
	useEffect(() => {
		setActiveSection('products');
	}, [setActiveSection]);

	return (
		<CatalogProvider initialFirst={18}>
			<SearchSection />
			<div className="container-wrapper">
				<div className="container">
					<ProductsSection />
				</div>
			</div>
		</CatalogProvider>
	)

}
export default ProductsLayout;
