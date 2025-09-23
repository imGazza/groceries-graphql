import type { GroceryItem } from "@/http/grocery-list";
import { Card, CardDescription, CardTitle } from "./card";
import IconButton from "./icon-button";
import ConfirmDialog from "./confirm-dialog";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface CartItemProps {
	item: GroceryItem;
	initialQuantity: number;
	increseQuantity: 	(item: GroceryItem, quantity: number) => void;
	decreaseQuantity: (item: GroceryItem, quantity: number) => void;
	removeItem: (item: GroceryItem, quantity: number) => void;
}

const CartItem = ({ item, initialQuantity, increseQuantity, decreaseQuantity, removeItem }: CartItemProps) => {

	const [quantity, setQuantity] = useState(initialQuantity);
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

	const uint8Array = new Uint8Array(item.image);
	const imageUrl = URL.createObjectURL(new Blob([uint8Array], { type: 'image/jpeg' }));

	const currencyPrice = (price: number) => new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'EUR'
	}).format(price);	

	const increaseItemQuantity = (quantity: number) => {
		if(quantity === 1) return;

		increseQuantity(item, quantity);
		setQuantity(quantity);
	}

	const decreaseItemQuantity = (quantity: number) => {
		if(quantity === 0){
			setOpenConfirmDialog(true);
			return;
		}

		decreaseQuantity(item, quantity);
		setQuantity(quantity);
	}

	const removeItemFromList = () => {
		removeItem(item, quantity);
		setQuantity(0);
	}

	return (
		<div className="gap-1.5 py-3">
			<img src={imageUrl} alt={item.productItemName} className="h-full object-cover object-bottom w-full" />
			<div className="p-3">
				<CardTitle className="text-left font-normal text-md text-card-foreground/65">
					{currencyPrice(item.unitPrice)}
				</CardTitle>
				<CardDescription className="text-left text-sm font-semibold text-card-foreground/85">
					{item.productItemName}
				</CardDescription>
				<CardDescription className="text-left text-[0.625rem] font-semibold text-card-foreground/65">
					{item.quantity}
				</CardDescription>
			</div>

			<div className="flex justify-between px-3 items-center">
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

			<ConfirmDialog onConfirm={removeItemFromList} open={openConfirmDialog} onOpenChange={(open: boolean) => setOpenConfirmDialog(open)} message="Are you sure you want to remove this item from your cart?" />
		</div>
	)
}
export default CartItem;