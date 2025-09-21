import { GET_FILTERED_CATALOG } from "@/http/catalog";
import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { CatalogContext } from "./catalog-context";
import { buildFilters } from "./common";

interface CatalogProviderProps {
	children: React.ReactNode;
	initialFirst: number;
}

const CatalogProvider = ({ children, initialFirst }: CatalogProviderProps) => {

	const [searchTerm, setSearchTerm] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [first, setFirst] = useState(initialFirst);

	//Every time the searchTerm, categoryId or first changes, we need to update the variables. This will trigger the query
	const variables = useMemo(() => {
		return {
			first: first
		};
	}, [first, searchTerm, categoryId]);	

	const { data: catalogData, loading } = useQuery(GET_FILTERED_CATALOG(buildFilters(searchTerm, categoryId)), { variables });

	const setSearchTermQuery = (term: string) => {
		setSearchTerm(term);
	};

	const setCategoryQuery = (id: string) => {
		setCategoryId(id);
	};

	const setFirstQuery = (first: number) => {
		setFirst(first);
	}

	const value = useMemo(() => {
		return {
			catalogData: catalogData,
			loading,
			setSearchTermQuery,
			setCategoryQuery,
			setFirstQuery
		};
	}, [catalogData, loading]);

	return (
		<CatalogContext.Provider value={value}>
			{children}
		</CatalogContext.Provider>
	)
}
export default CatalogProvider;