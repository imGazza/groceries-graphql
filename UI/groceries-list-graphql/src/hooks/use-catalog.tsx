import { GET_CATALOG } from "@/http/catalog";
import { useQuery } from "@apollo/client";
import { useState, useMemo } from "react";

const useCatalog = (initialFirst: number = 10) => {

	const [searchTerm, setSearchTerm] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [first, setFirst] = useState(initialFirst);

	const variables = useMemo(() => {
		return {
			first: first,
			search: searchTerm ?? '',
			categoryId: categoryId ?? ''
		};
	}, [first, searchTerm, categoryId]);

	const { data: catalogData, loading, error, refetch } = useQuery(GET_CATALOG, { variables });

	const setSearchTermQuery = (term: string) => {
		setSearchTerm(term);
	};

	const setCategoryQuery = (id: string) => {
		setCategoryId(id);
	};

	return {
		catalogData,
		loading,
		error,
		setSearchTermQuery,
		setCategoryQuery,
		refetch,
		setFirst
	};
};
export default useCatalog;