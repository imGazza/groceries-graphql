import { ChevronRight, type LucideIcon } from "lucide-react"

interface CategoriesItemProps {
	name: string;
	Icon: LucideIcon;
}

const CategoriesItem = ({ name, Icon }: CategoriesItemProps) => {
	return (
		<div className="flex justify-center bg-secondary p-4">
			<div className="flex items-center justify-between gap-4 w-[90%]">
				<Icon className="h-5 w-5" />
				<div className="text-sm font-semibold">{name}</div>
				<ChevronRight className="h-5 w-5" />
			</div>
		</div>
	)
}
export default CategoriesItem