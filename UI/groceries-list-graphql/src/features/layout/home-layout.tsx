import useActiveSection from "@/hooks/use-active-section";
import Categories from "../home/categories"
import HomeBanner from "../home/home-banner"
import LatestProducts from "../home/latest-products"
import { useEffect } from "react";

const HomeLayout = () => {

	const { setActiveSection } = useActiveSection();
	
	useEffect(() => {
		setActiveSection('home');
	}, [setActiveSection]);

	return (
		<div className="container-wrapper">
			<div className="container grid grid-cols-10 gap-6 pt-0 py-4">
				<div className="grid col-span-3">
					<div>
						<Categories />
					</div>
				</div>
				<div className="grid col-span-7">
					<div>
						<HomeBanner />
					</div>
				</div>
				<div className="grid col-span-10">
					<div>
						<LatestProducts />
					</div>
				</div>
			</div>
		</div>
	)
}
export default HomeLayout