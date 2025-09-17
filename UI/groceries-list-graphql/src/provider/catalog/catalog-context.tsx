import type { CatalogDataOutput } from "@/http/catalog";
import { createContext } from "react";

export const CatalogContext = createContext<{
    catalogData: CatalogDataOutput | undefined,
    loading: boolean,
    setSearchTermQuery: (term: string) => void,
    setCategoryQuery: (id: string) => void,
    setFirstQuery: (first: number) => void
}>({
    catalogData: undefined,
    loading: false,
    setSearchTermQuery: () => {},
    setCategoryQuery: () => {},
    setFirstQuery: () => {}
})