import { useEffect, useState, type ChangeEvent } from "react";
import { Popover, PopoverAnchor, PopoverContent } from "./popover";
import ProductsDisplay from "./products-display";
import { Input } from "./input";
import SearchBarButton from "./searchbar-button";
import { useDebounce } from "use-debounce";
import useSearch from "@/hooks/use-search";
import { Link } from "react-router";
import { Button } from "./button";
import { ChevronsRight } from "lucide-react";

const TopbarSearchBar = () => {

	const [popoverOpen, setPopoverOpen] = useState(false);
	const { catalogData, setSearchTermQuery } = useSearch();

	const [searchTerm, setSearchTerm] = useState('');
	const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

	useEffect(() => {
		setSearchTermQuery(debouncedSearchTerm);
	}, [debouncedSearchTerm, setSearchTermQuery]);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			setPopoverOpen(true);
		}
		else {
			setPopoverOpen(false);
		}

		const value = event.target.value;
		setSearchTerm(value);
	};

	return (
		<Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
			<PopoverContent className="w-115" onOpenAutoFocus={e => e.preventDefault()}>
				<ProductsDisplay products={catalogData?.catalog.nodes.slice(0, 4)!} skeletonLoadingQty={4} className="grid-cols-2" />
				{
					catalogData?.catalog.nodes && catalogData?.catalog.nodes.length > 4 &&
					(
						<div className="flex justify-end w-full">
							<Link to={`/products?search=${searchTerm}`}>
								<Button variant="ghost">
									<ChevronsRight /> View more
								</Button>
							</Link>

						</div>
					)
				}
			</PopoverContent>
			<PopoverAnchor className="rounded-md flex bg-secondary shadow-2xs shadow-slate-300 overflow-hidden">
				<Input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search product..." className="border-0 bg-none w-sm rounded-none" />
				<SearchBarButton />
			</PopoverAnchor>
		</Popover>
	)
}
export default TopbarSearchBar;