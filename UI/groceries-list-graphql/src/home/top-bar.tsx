import { Button } from "@/components/ui/button"
import IconButton from "@/components/ui/icon-button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import SearchBar from "@/components/ui/searchbar"
import { Link } from "@radix-ui/react-navigation-menu"
import { ShoppingBasket, User } from "lucide-react"


const TopBar = () => {
	return (
		<div className="flex justify-between gap-2">
			<div className="mr-20">
				<NavigationMenu viewport={false}>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
								<Link href="#">									
										Home
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
								<Link href="#">									
										Shop
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
								<Link href="#">
										About
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>

			<div className="flex gap-3">
				<SearchBar />
				<IconButton><User /></IconButton>
				<IconButton><ShoppingBasket /></IconButton>
			</div>
		</div>
	)
}
export default TopBar