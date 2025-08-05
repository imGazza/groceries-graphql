import type { Product } from "@/http/catalog";
import { Card, CardDescription, CardTitle } from "./card";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useState } from "react";
import ConfirmDialog from "./confirm-dialog";
import { useMutation } from "@apollo/client";
import { ADD_ITEM, DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_ITEM } from "@/http/grocery-list";

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {

	const [quantity, setQuantity] = useState(0);
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
	const [ addItem ] = useMutation(ADD_ITEM);
	const [ increaseQuantity ] = useMutation(INCREASE_QUANTITY);
	const [ decreaseQuantity ] = useMutation(DECREASE_QUANTITY);
	const [ removeItem ] = useMutation(REMOVE_ITEM);

  const uint8Array = new Uint8Array(product.image.data);
  const imageUrl = URL.createObjectURL(new Blob([uint8Array], { type: 'image/jpeg' }));

	const currencyPrice = (price: number) => new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'EUR'
	}).format(price);

	const addItemToList = async (product: Product) => {
		if(quantity !== 0){
			return;
		}
		
		await addItem({ variables: mapProductToGroceryItem(product, 1) });
		setQuantity(1);
	}

	const increaseItemQuantity = async (quantity: number) => {
		if(quantity === 1){
			return;
		}

		await increaseQuantity({ variables: mapProductToGroceryItem(product, quantity) })
		setQuantity(quantity);
	}

	const decreaseItemQuantity = async (quantity: number) => {
		if(quantity === 0){
			setOpenConfirmDialog(true);
			return;
		}

		await decreaseQuantity({ variables: mapProductToGroceryItem(product, quantity) })
		setQuantity(quantity);
	}

	const removeItemFromList = async () => {
		await removeItem({ variables: mapProductToGroceryItem(product, 0) });
		setQuantity(0);
	}

	const mapProductToGroceryItem = (product: Product, quantity: number) => {
		return {
			groceryItem: {
				productItemId: product.id,
				productItemName: product.name,
				quantity: quantity,
				unitPrice: product.price
			},
			groceryListId: "688b6544f77dadbe36fc33b7"
		}
	}

	return (
		<Card className="gap-1.5 py-3">
			<img src={imageUrl} alt={product.name} className="h-full object-cover object-bottom w-full" />
			<div className="p-3">
				<CardTitle className="text-left font-normal text-md text-card-foreground/65">
					{currencyPrice(product.price)}
				</CardTitle>
				<CardDescription className="text-left text-sm font-semibold text-card-foreground/85">
					{product.name}
				</CardDescription>
				<CardDescription className="text-left text-[0.625rem] font-semibold text-card-foreground/65">
					{product.measurementQuantity} {product.measurementUnit}
				</CardDescription>
			</div>
			
			{quantity === 0 ? 
				(<div className="flex justify-end px-3">
					<IconButton className="bg-custom text-secondary hover:bg-custom/80" onClick={() => addItemToList(product)}>
						<ShoppingCart className="w-4 h-4" />
					</IconButton>
				</div>)
				:	
				(<div className="flex justify-between px-3 items-center">
					<IconButton 
						className="bg-custom text-secondary hover:bg-custom/80" 
						onClick={() => decreaseItemQuantity(quantity - 1)}>
						<Minus className="w-4 h-4" />
					</IconButton>
					{quantity}
					<IconButton className="bg-custom text-secondary hover:bg-custom/80" onClick={() => increaseItemQuantity(quantity + 1)}>
						<Plus className="w-4 h-4" />
					</IconButton>
				</div>)
			}

			<ConfirmDialog onConfirm={removeItemFromList} open={openConfirmDialog} onOpenChange={(open: boolean) => setOpenConfirmDialog(open)} message="Are you sure you want to remove this item from your cart?"/>
		</Card>
	)
}
export default ProductCard;