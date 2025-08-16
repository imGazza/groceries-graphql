import { Input } from "./input"
import { Search } from "lucide-react";

const ProductsSearchBar = () => {
	return (
		<div className="rounded-md flex bg-secondary shadow-2xs shadow-slate-300 overflow-hidden border-2 border-custom flex items-center gap-4 px-4">
			<Search className="w-5 h-5 text-muted-foreground" />
			<Input type="text" placeholder="Search product..." className="border-0 bg-none w-md rounded-md h-11 shadow-none px-0" />
		</div>
	)
}
export default ProductsSearchBar;
