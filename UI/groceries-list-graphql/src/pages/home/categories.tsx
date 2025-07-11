import { Card } from "@/components/ui/card";
import { Apple, Beef, Carrot, ChevronRight, Salad } from "lucide-react";

//className="rounded-md overflow-hidden shadow-slate-300"
const Categories = () => {
	return (
		<Card className="overflow-hidden py-0 rounded-md gap-0 text-sm font-semibold text-card-foreground/70">
			<div className="flex flex-col justify-center pacifico-font bg-custom h-12 text-xl text-secondary">
				Categories
			</div>
			<div className="flex justify-center bg-secondary p-4">
				<div className="flex items-center justify-between gap-4 w-[90%]">
					<Salad className="h-5 w-5" />
					Vegetables
					<ChevronRight className="h-5 w-5" />
				</div>
			</div>
			<div className="flex justify-center bg-secondary p-4">
				<div className="flex items-center justify-between gap-4 w-[90%]">
					<Apple className="h-5 w-5" />
					Fruits
					<ChevronRight className="h-5 w-5" />
				</div>
			</div>
			<div className="flex justify-center bg-secondary p-4">
				<div className="flex items-center justify-between gap-4 w-[90%]">
					<Beef className="h-5 w-5" />
					Meat
					<ChevronRight className="h-5 w-5" />
				</div>
			</div>
		</Card>
	)
}
export default Categories;