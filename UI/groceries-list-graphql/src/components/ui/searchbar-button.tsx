
import { Button } from "./button"
import { Search } from "lucide-react";

const SearchBarButton = () => {
	return (
		<Button 
			className="border-0 rounded-none px-10 text-white" variant="custom" size="icon">
				<Search />
		</Button>
	)
}
export default SearchBarButton;