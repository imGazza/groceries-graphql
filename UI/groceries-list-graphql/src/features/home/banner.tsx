import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Banner = () => {
	return (
		<Card className="overflow-hidden py-0 rounded-md gap-0 text-sm font-semibold text-card-foreground/85 h-[500px]">
			<div className="relative h-full w-full">
				<div className="absolute p-10 max-w-[60%] flex flex-col gap-4">
					<h1 className="text-4xl font-semibold text-balance text-left tracking-tighter">Check out all the products</h1>
					<p className="text-left text-lg text-balance tracking-tight">Build your custom grocery lists and track all your purchases</p>
					<Button variant="custom" className="w-[50%]">View Products</Button>
				</div>
				<img alt="groceries" className="h-full object-cover object-bottom w-full" src="/groceries.png" />
			</div>
		</Card>
	)
}
export default Banner;