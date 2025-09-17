import type { Category } from "@/http/categories";
import { getCategoryIcon } from "@/lib/categories-icons";
import { ChevronRight } from "lucide-react"
import { Link } from "react-router";

interface CategoriesItemProps {
	category: Category;
}

const CategoriesItem = ({ category }: CategoriesItemProps) => {

	const Icon = getCategoryIcon(category.iconName);

	return (
		<div className="flex justify-center bg-secondary p-4">
			<Link to={`/products/${category.id}`} className="flex items-center justify-between gap-4 w-[90%]">
				<Icon className="h-5 w-5" />
				<div className="text-sm font-semibold">{category.name}</div>
				<ChevronRight className="h-5 w-5" />
			</Link>
		</div>
	)
}
export default CategoriesItem