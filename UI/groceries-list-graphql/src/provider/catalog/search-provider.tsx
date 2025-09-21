import { GET_FILTERED_CATALOG } from "@/http/catalog";
import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { buildFilters, searchInitialFirst } from "./common";
import { SearchContext } from "./search-context";

interface SearchProviderProps {
	children: React.ReactNode;
}

const SearchProvider = ({ children }: SearchProviderProps) => {

	const [searchTerm, setSearchTerm] = useState('');
	const [first, setFirst] = useState(searchInitialFirst);

	//Every time the searchTerm, categoryId or first changes, we need to update the variables. This will trigger the query
	const variables = useMemo(() => {
		return {
			first: first
		};
	}, [first, searchTerm]);	

	const { data: catalogData, loading } = useQuery(GET_FILTERED_CATALOG(buildFilters(searchTerm)), { variables, skip: !searchTerm });

	const setSearchTermQuery = (term: string) => {
		setSearchTerm(term);
	};

	const setFirstTermQuery = (first: number) => {
		setFirst(first);
	};

	const value = useMemo(() => {
		return {
			catalogData: catalogData,
			loading,
			setSearchTermQuery,
			setFirstTermQuery
		};
	}, [catalogData, loading]);

	return (
		<SearchContext.Provider value={value}>
			{children}
		</SearchContext.Provider>
	)
}
export default SearchProvider;