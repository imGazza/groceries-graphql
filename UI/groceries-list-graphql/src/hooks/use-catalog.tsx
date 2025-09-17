import { CatalogContext } from "@/provider/catalog/catalog-context";
import { useContext } from "react";

const useCatalog = () => {

	const context = useContext(CatalogContext);

	if (context === undefined)
		throw new Error("useCatalog must be in a CatalogProvider")

	return context
	
};
export default useCatalog;