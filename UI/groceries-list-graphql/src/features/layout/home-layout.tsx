import Banner from "../home/banner"
import Categories from "../home/categories"
import LatestProducts from "../home/latest-products"

const HomeLayout = () => {

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
						<Banner />
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