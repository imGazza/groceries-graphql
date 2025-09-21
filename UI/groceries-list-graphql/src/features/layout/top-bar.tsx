import { Badge } from "@/components/ui/badge"
import IconButton from "@/components/ui/icon-button"
import Logo from "@/components/ui/logo"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import TopbarSearchBar from "@/components/ui/topbar-searchbar"
import useActiveSection from "@/hooks/use-active-section"
import useDraftList from "@/hooks/use-draft-list"
import CatalogProvider from "@/provider/catalog/catalog-provider"
import SearchProvider from "@/provider/catalog/search-provider"
import { ShoppingBasket, User } from "lucide-react"
import { Link } from "react-router"


const TopBar = () => {

	const { activeSection } = useActiveSection();
	const { groceryList } = useDraftList();

	const menuItems = [
		{ id: 'home', value: 'Home', url: '/' },
		{ id: 'products', value: 'Products', url: '/products' },
		{ id: 'about', value: 'About', url: '/about' }
	]

	return (
		<div className="container-wrapper">
			<div className="container items-center flex justify-between gap-2 py-6">
				<Logo />
				<div className="mr-20">
					<NavigationMenu viewport={false}>
						<NavigationMenuList>
							{menuItems.map(item => (
								<NavigationMenuItem key={item.id}>
									<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
										<Link to={item.url} className={activeSection === item.id ? 'text-custom' : ''}>
											{item.value}
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				<div className="flex gap-3">
					<SearchProvider>
						<TopbarSearchBar />
						<IconButton >
							<User />
						</IconButton>
						<IconButton className="relative">
							{
								(groceryList?.items?.length ?? 0) > 0 &&
								<Badge
									className="absolute -top-1 -right-1 px-1 min-w-4 h-4 flex items-center font-mono justify-center text-[10px] rounded-full"
									variant="destructive"
								>
									{groceryList?.items.length}
								</Badge>
							}
							<ShoppingBasket />
						</IconButton>
					</SearchProvider>
				</div>
			</div>
		</div>
	)
}
export default TopBar;