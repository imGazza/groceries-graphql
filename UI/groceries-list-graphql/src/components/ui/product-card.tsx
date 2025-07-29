import type { Product } from "@/http/catalog";
import { Card, CardDescription, CardTitle } from "./card";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useState } from "react";
import ConfirmDialog from "./confirm-dialog";

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {

	const [quantity, setQuantity] = useState(0);
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const uint8Array = new Uint8Array(product.image.data);
  const imageUrl = URL.createObjectURL(new Blob([uint8Array], { type: 'image/jpeg' }));

	const currencyPrice = (price: number) => new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'EUR'
	}).format(price);

	const decreaseQuantity = (quantity: number) => {
		if(quantity === 0){
			setOpenConfirmDialog(true);
		}
		else{
			setQuantity(quantity);
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
					<IconButton className="bg-custom text-secondary hover:bg-custom/80" onClick={() => setQuantity(quantity + 1)}>
						<ShoppingCart className="w-4 h-4" />
					</IconButton>
				</div>)
				:	
				(<div className="flex justify-between px-3 items-center">
					<IconButton 
						className="bg-custom text-secondary hover:bg-custom/80" 
						onClick={() => decreaseQuantity(quantity - 1)}>
						<Minus className="w-4 h-4" />
					</IconButton>
					{quantity}
					<IconButton className="bg-custom text-secondary hover:bg-custom/80" onClick={() => setQuantity(quantity + 1)}>
						<Plus className="w-4 h-4" />
					</IconButton>
				</div>)
			}

			<ConfirmDialog onConfirm={() => setQuantity(0)} open={openConfirmDialog} onOpenChange={(open: boolean) => setOpenConfirmDialog(open)} message="Are you sure you want to remove this item from your cart?"/>
		</Card>
	)
}
export default ProductCard;