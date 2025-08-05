import IconButton from "@/components/ui/icon-button"
import Logo from "@/components/ui/logo"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import SearchBar from "@/components/ui/searchbar"
import useActiveSection from "@/hooks/use-active-section"
import { Link } from "@radix-ui/react-navigation-menu"
import { ShoppingBasket, User } from "lucide-react"


const TopBar = () => {

	const { activeSection, setActiveSection } = useActiveSection();

	const menuItems = [
		{ id: 'home', value: 'Home' },
		{ id: 'products', value: 'Products' },
		{ id: 'about', value: 'About' }
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
									<Link href="#" className={activeSection === item.id ? 'text-custom' : ''} onClick={() => setActiveSection(item.id)}>
										{item.value}
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
			</div>

			<div className="flex gap-3">
				<SearchBar />
				<IconButton><User /></IconButton>
				<IconButton><ShoppingBasket /></IconButton>
			</div>
		</div>
		</div>		
	)
}
export default TopBar;