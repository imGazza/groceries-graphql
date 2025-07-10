import { Input } from "./input";
import SearchBarButton from "./searchbar-button";

const SearchBar = () => {

	return (
		<div className="rounded-md flex bg-secondary shadow-2xs shadow-slate-300 overflow-hidden">
			<Input type="text" placeholder="Search product..." className="border-0 bg-none w-sm rounded-none" />
			<SearchBarButton />
		</div>
	)
}
export default SearchBar;