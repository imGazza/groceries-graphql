import { ShoppingBasket } from "lucide-react"
import { Badge } from "./badge"
import IconButton from "./icon-button"
import useDraftList from "@/hooks/use-draft-list";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { Button } from "./button";
import { useMutation } from "@apollo/client";
import { COMPLETE_LIST, DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_ITEM, type CompleteListOutput, type GroceryItem, type GroceryList } from "@/http/grocery-list";
import CartItem from "./cart-item";
import { ScrollArea } from "./scroll-area";

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

	const { groceryList, changeItemQuantity, removeGroceryItem, confirmGroceryList } = useDraftList();

	const [increaseQuantity] = useMutation(INCREASE_QUANTITY);
	const [decreaseQuantity] = useMutation(DECREASE_QUANTITY);
	const [removeItem] = useMutation(REMOVE_ITEM);
	const [completeList] = useMutation(COMPLETE_LIST, {
		onCompleted: (data: CompleteListOutput) => {
			confirmGroceryList(data.completeList);
		}
	});

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

	const completeCart = async () => {
		await completeList({ variables: { groceryListId: groceryList?.id, userId: groceryList?.userId } });
	}

	console.log(groceryList);

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
							{groceryList?.items?.length ?? 0}
						</Badge>
					}
					<ShoppingBasket />
				</IconButton>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Cart</SheetTitle>
					<SheetDescription>
						You have {groceryList?.items?.length === 1 ? '1 product' : `${groceryList?.items?.length ?? 0} products`} in your cart
					</SheetDescription>
				</SheetHeader>

				<div className="flex-1 overflow-hidden">
					<ScrollArea className="h-full w-full">
						<div className="space-y-2 px-2">
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
						</div>
					</ScrollArea>
				</div>

				<SheetFooter>
					<div className="space-y-3 p-6 rounded-lg border-2 border-custom/20 bg-custom/5">
						<div className="flex items-center justify-between">
							<span className="text-lg font-semibold text-foreground">Total</span>
							<span className="text-2xl font-bold text-primary">${groceryList?.totalPrice.toFixed(2)}</span>
						</div>
					</div>
					<Button onClick={completeCart} className="bg-custom text-secondary hover:bg-custom/80" type="submit">Confirm Cart</Button>
					<SheetClose asChild>
						<Button variant="outline">Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
export default Cart;