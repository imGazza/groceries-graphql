import H1 from "@/components/ui/h1"
import ProductsSearchBar from "@/components/ui/products-searchbar"

const SearchSection = () => {
	return (
		<div className="bg-custom/20 flex flex-col items-center p-8 gap-6">
			<H1>
				Navigate through your desired products
			</H1>	
			<ProductsSearchBar />
		</div>
	)
}
export default SearchSection
