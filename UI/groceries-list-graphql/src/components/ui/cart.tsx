import { ShoppingBasket } from "lucide-react"
import { Badge } from "./badge"
import IconButton from "./icon-button"
import useDraftList from "@/hooks/use-draft-list";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { Button } from "./button";
import { useMutation } from "@apollo/client";
import { DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_ITEM, type GroceryItem, type GroceryList } from "@/http/grocery-list";
import CartItem from "./cart-item";
import { ScrollArea } from "./scroll-area";
import { useEffect } from "react";

const mapToItemData = (groceryList: GroceryList | null, item: GroceryItem, quantity: number) => {
	return {
		groceryItem: { 
			productItemId: item.productItemId,
			productItemName: item.productItemName,
			quantity: quantity,
			unitPrice: item.unitPrice,
			image: item.image
		},
		groceryListId: groceryList?.id
	}
}

const Cart = () => {

	const { groceryList, changeItemQuantity, removeGroceryItem } = useDraftList();

	const [increaseQuantity] = useMutation(INCREASE_QUANTITY);
	const [decreaseQuantity] = useMutation(DECREASE_QUANTITY);
	const [removeItem] = useMutation(REMOVE_ITEM);

	const increaseItemQuantity = async (item: GroceryItem, quantity: number) => {
		await increaseQuantity({ variables: mapToItemData(groceryList, item, quantity) });
		changeItemQuantity(item, quantity);
	}

	const decreaseItemQuantity = async (item: GroceryItem, quantity: number) => {
		await decreaseQuantity({ variables: mapToItemData(groceryList, item, quantity) })
		changeItemQuantity(item, quantity);
	}

	const removeItemFromList = async (item: GroceryItem) => {
		await removeItem({ variables: mapToItemData(groceryList, item, 0) });
		removeGroceryItem(item);
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

				<div className="flex-1 my-4 overflow-hidden">
					<ScrollArea className="h-full w-full">
						{groceryList?.items.map(item => (
							<CartItem
								key={item.productItemId}
								item={item}
								initialQuantity={item.quantity}
								increseQuantity={increaseItemQuantity}
								decreaseQuantity={decreaseItemQuantity}
								removeItem={removeItemFromList}
							/>
						))}
					</ScrollArea>
				</div>

				<SheetFooter>
					<Button type="submit">{groceryList?.totalPrice ? `Total: $${groceryList?.totalPrice}` : 'Save changes'}</Button>
					<SheetClose asChild>
						<Button variant="outline">Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
export default Cart;