import { ShoppingBasket } from "lucide-react"
import { Badge } from "./badge"
import IconButton from "./icon-button"
import useDraftList from "@/hooks/use-draft-list";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { Button } from "./button";
import { useMutation } from "@apollo/client";
import { DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_ITEM, type GroceryItem, type GroceryList } from "@/http/grocery-list";
import type { Product } from "@/http/catalog";
import CartItem from "./cart-item";

const mapToItemData = (groceryList: GroceryList | null, item: GroceryItem, quantity: number) => {
		return {
			groceryItem: item,
			groceryListId: groceryList?.id
		}
	}

const Cart = () => {

	const { groceryList, setGroceryList } = useDraftList();

	const [increaseQuantity] = useMutation(INCREASE_QUANTITY);
	const [decreaseQuantity] = useMutation(DECREASE_QUANTITY);
	const [removeItem] = useMutation(REMOVE_ITEM);

	const increaseItemQuantity = async (item: GroceryItem, quantity: number) => {
		await increaseQuantity({ variables: mapToItemData(groceryList, item, quantity) });
		setGroceryList({ ...groceryList!, items: groceryList!.items.map(i => i.productItemId === item.productItemId ? { ...i, quantity: quantity } : i) });
	}

	const decreaseItemQuantity = async (item: GroceryItem, quantity: number) => {
		await decreaseQuantity({ variables: mapToItemData(groceryList, item, quantity) })
		setGroceryList({ ...groceryList!, items: groceryList!.items.map(i => i.productItemId === item.productItemId ? { ...i, quantity: quantity } : i) });
	}

	const removeItemFromList = async (item: GroceryItem) => {
		await removeItem({ variables: mapToItemData(groceryList, item, 0) });
		setGroceryList({ ...groceryList!, items: groceryList!.items.filter(i => i.productItemId !== item.productItemId) });
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
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
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Cart</SheetTitle>
					<SheetDescription>
						You have {groceryList?.items.length === 1 ? '1 product' : `${groceryList?.items.length} products`} in your cart
					</SheetDescription>
				</SheetHeader>
				{ groceryList?.items.map(item => (
					<CartItem 
						key={item.productItemId}
						item={item}
						initialQuantity={item.quantity}
						increseQuantity={increaseItemQuantity}
						decreaseQuantity={decreaseItemQuantity}
						removeItem={removeItemFromList}
					/>
				)) }
				<SheetFooter>
					<Button type="submit">Save changes</Button>
					<SheetClose asChild>
						<Button variant="outline">Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
export default Cart;