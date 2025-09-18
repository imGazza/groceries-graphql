import { cn } from "@/lib/utils";

const Logo = ({ className }: React.ComponentProps<"div">) => {
	return (
		<div className={cn("text-2xl groceries-logo pacifico-font", className)}>
			Groceries
		</div>
	)
}
export default Logo;