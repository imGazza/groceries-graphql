import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CategoriesItem from "@/features/home/categories-item";
import { GET_CATEGORIES } from "@/http/categories";
import { getCategoryIcon } from "@/lib/categories-icons";
import { skeletonUniqueId } from "@/lib/utils";
import { useQuery } from "@apollo/client";

const Categories = () => {

	const { data, loading } = useQuery(GET_CATEGORIES);

	if (loading) {
		return <CategoriesSkeleton />
	}

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

const CategoriesSkeleton = () => {
	return (
		<Card className="overflow-hidden py-0 rounded-md gap-0 text-card-foreground/85">
			<CardHeader className="pacifico-font bg-custom h-12 text-xl text-secondary grid-rows-[auto] items-center">
				<CardTitle>Categories</CardTitle>
			</CardHeader>
			{Array.from({length: 8}).map(() => (
				<div key={skeletonUniqueId()} className="flex justify-center bg-secondary p-4">
					<div className="flex items-center justify-between gap-4 w-[90%]">
						<Skeleton className="h-5 w-5" />
						<Skeleton className="h-5 w-50" />
						<Skeleton className="h-5 w-5" />
					</div>
				</div>
			))}
		</Card>
	)
}
export { CategoriesSkeleton }
