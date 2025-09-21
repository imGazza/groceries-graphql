import type { CatalogDataOutput } from "@/http/catalog";
import { createContext } from "react";

export const SearchContext = createContext<{
    catalogData: CatalogDataOutput | undefined,
    loading: boolean,
    setSearchTermQuery: (term: string) => void,
    setFirstTermQuery: (first: number) => void

}>({
    catalogData: undefined,
    loading: false,
    setSearchTermQuery: () => {},
		setFirstTermQuery: () => {}
})