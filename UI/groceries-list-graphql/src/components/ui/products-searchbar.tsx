import useCatalog from "@/hooks/use-catalog";
import { Input } from "./input"
import { Search } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";
import { useDebounce } from 'use-debounce';

const ProductsSearchBar = () => {

	const { setSearchTermQuery } = useCatalog();
	const [searchTerm, setSearchTerm] = useState('');
	const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

	useEffect(() => {
		setSearchTermQuery(debouncedSearchTerm);
	}, [debouncedSearchTerm, setSearchTermQuery]);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSearchTerm(value);
	};

	return (
		<div className="rounded-md flex bg-secondary shadow-2xs shadow-slate-300 overflow-hidden border-2 border-custom flex items-center gap-4 px-4">
			<Search className="w-5 h-5 text-muted-foreground" />
			<Input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search product..." className="border-0 bg-none w-md rounded-md h-11 shadow-none px-0" />
		</div>
	)
}
export default ProductsSearchBar;
