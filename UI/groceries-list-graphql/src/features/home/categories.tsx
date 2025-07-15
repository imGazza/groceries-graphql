import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import CategoriesItem from "@/features/home/categories-item";
import { GET_CATEGORIES } from "@/http/categories";
import { getCategoryIcon } from "@/lib/categories-icons";
import { useQuery } from "@apollo/client";

const Categories = () => {

	const { data } = useQuery(GET_CATEGORIES);

	return (
		<Card className="overflow-hidden py-0 rounded-md gap-0 text-card-foreground/85">
			<CardHeader className="pacifico-font bg-custom h-12 text-xl text-secondary grid-rows-[auto] items-center">
				<CardTitle>Categories</CardTitle>				
			</CardHeader>
			
			{
				data?.categories.map(category => (
					<CategoriesItem key={category.name} Icon={getCategoryIcon(category.iconName)} name={category.name} />
				))
			}

		</Card>
	)
}
export default Categories;