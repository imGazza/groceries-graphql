import { SearchContext } from "@/provider/catalog/search-context";
import { useContext } from "react";

const useSearch = () => {

	const context = useContext(SearchContext);

	if (context === undefined)
		throw new Error("useSearch must be in a SearchProvider")

	return context
	
};
export default useSearch;