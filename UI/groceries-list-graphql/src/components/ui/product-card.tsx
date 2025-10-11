import type { Product } from "@/http/catalog";
import { Card, CardDescription, CardTitle } from "./card";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useEffect, useState } from "react";
import ConfirmDialog from "./confirm-dialog";
import { Skeleton } from "./skeleton";
import { createImageUrl } from "@/lib/utils";

interface ProductCardProps {
	product: Product;
	initialQuantity: number;
	addItem: (product: Product) => void;
	increseQuantity: (product: Product, quantity: number) => void;
	decreaseQuantity: (product: Product, quantity: number) => void;
	removeItem: (product: Product, quantity: number) => void;
}

const ProductCard = ({ product, initialQuantity, addItem, increseQuantity, decreaseQuantity, removeItem }: ProductCardProps) => {

	const [quantity, setQuantity] = useState(initialQuantity);
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

	useEffect(() => {
		setQuantity(initialQuantity);
	}, [initialQuantity]);

	const imageUrl = createImageUrl(product.image.data);

	const currencyPrice = (price: number) => new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'EUR'
	}).format(price);

	const addItemToList = () => {
		if (quantity !== 0) return;

		addItem(product);
		setQuantity(1);
	}

	const increaseItemQuantity = (quantity: number) => {
		if (quantity === 1) return;

		increseQuantity(product, quantity);
		setQuantity(quantity);
	}

	const decreaseItemQuantity = (quantity: number) => {
		if (quantity === 0) {
			setOpenConfirmDialog(true);
			return;
		}

		decreaseQuantity(product, quantity);
		setQuantity(quantity);
	}

	const removeItemFromList = () => {
		removeItem(product, quantity);
		setQuantity(0);
	}

	if (!product) {
		return <ProductCardSkeleton />
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
					<IconButton className="bg-custom text-secondary hover:bg-custom/80" onClick={() => addItemToList()}>
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

			<ConfirmDialog onConfirm={removeItemFromList} open={openConfirmDialog} onOpenChange={(open: boolean) => setOpenConfirmDialog(open)} message="Are you sure you want to remove this item from your cart?" />
		</Card>
	)
}
export default ProductCard;

const ProductCardSkeleton = () => {
	return (
		<Card className="gap-1.5 py-3 pt-0">
			<Skeleton className="h-37 w-full" />
			<div className="p-3">
				<Skeleton className="h-5 w-16 mb-1" />
				<Skeleton className="h-4 w-full mb-1" />
				<Skeleton className="h-3 w-20" />
			</div>

			<div className="flex justify-end px-3">
				<Skeleton className="h-8 w-8 rounded-md" />
			</div>
		</Card>
	)
}
export { ProductCardSkeleton }
