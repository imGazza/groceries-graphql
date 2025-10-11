import type { GroceryItem } from "@/http/grocery-list";
import { CardDescription, CardTitle } from "./card";
import IconButton from "./icon-button";
import ConfirmDialog from "./confirm-dialog";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { createImageUrl } from "@/lib/utils";

interface CartItemProps {
	item: GroceryItem;
	initialQuantity: number;
	increseQuantity: (item: GroceryItem, quantity: number) => void;
	decreaseQuantity: (item: GroceryItem, quantity: number) => void;
	removeItem: (item: GroceryItem) => void;
}

const CartItem = ({ item, initialQuantity, increseQuantity, decreaseQuantity, removeItem }: CartItemProps) => {

	const [quantity, setQuantity] = useState(initialQuantity);
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

	useEffect(() => {
		setQuantity(initialQuantity);
	}, [initialQuantity]);

	const imageUrl = createImageUrl(item.image);

	const currencyPrice = (price: number) => new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'EUR'
	}).format(price);

	const increaseItemQuantity = (quantity: number) => {
		if (quantity === 1) return;

		increseQuantity(item, quantity);
		setQuantity(quantity);
	}

	const decreaseItemQuantity = (quantity: number) => {
		if (quantity === 0) {
			setOpenConfirmDialog(true);
			return;
		}

		decreaseQuantity(item, quantity);
		setQuantity(quantity);
	}

	const removeItemFromList = () => {
		removeItem(item);
		setQuantity(0);
	}

	return (
		<>
			<div
				key={item.productItemId}
				className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
			>
				<div className="relative h-9 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
					<img src={createImageUrl(item.image)} alt={item.productItemName} />
				</div>

				<div className="flex-1 min-w-0">
					<h4 className="font-semibold text-card-foreground truncate">{item.productItemName}</h4>
					<div className="flex items-center gap-2 mt-1">
						<span className="text-sm text-muted-foreground">
							${item.unitPrice.toFixed(2)}
						</span>
					</div>
				</div>
				
			<div className="flex justify-between px-3 items-center gap-3">
				<IconButton
					className="bg-custom text-secondary hover:bg-custom/80"
					onClick={() => decreaseItemQuantity(quantity - 1)}>
					<Minus className="w-4 h-4" />
				</IconButton>
				{quantity}
				<IconButton className="bg-custom text-secondary hover:bg-custom/80" onClick={() => increaseItemQuantity(quantity + 1)}>
					<Plus className="w-4 h-4" />
				</IconButton>
			</div>

			</div>
			
			<ConfirmDialog onConfirm={removeItemFromList} open={openConfirmDialog} onOpenChange={(open: boolean) => setOpenConfirmDialog(open)} message="Are you sure you want to remove this item from your cart?" />
		</>
	)
}
export default CartItem;