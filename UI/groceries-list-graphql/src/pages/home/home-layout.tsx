import Categories from "./categories"

const HomeLayout = () => {

	return(
		<div className="grid grid-cols-10 gap-6 py-4">
			<div className="grid col-span-3">
				<div>
					<Categories />
				</div>
			</div>
		</div>
	)
}
export default HomeLayout