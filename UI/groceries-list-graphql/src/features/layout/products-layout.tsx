import useActiveSection from "@/hooks/use-active-section";
import SearchSection from "../products/search-section";
import { useEffect } from "react";

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

				</div>
			</div>
		</>
	)

}
export default ProductsLayout;
