import type { Product } from "@/http/catalog";
import ProductCard, { ProductCardSkeleton } from "./product-card";
import useDraftList from "@/hooks/use-draft-list";
import { getQuantityOfProductInCart } from "@/lib/draft-list-utils";
import { cn, skeletonUniqueId } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { ADD_ITEM, INCREASE_QUANTITY, DECREASE_QUANTITY, REMOVE_ITEM, type GroceryList } from "@/http/grocery-list";

interface ProductsDisplayProps {
	products: Product[];
	skeletonLoadingQty: number;
	className?: string;
}

const mapToItemData = (groceryList: GroceryList | null, product: Product, quantity: number) => {
		return {
			groceryItem: mapToGroceryItem(product, quantity),
			groceryListId: groceryList?.id
		}
	}

const mapToGroceryItem = (product: Product, quantity: number) => {
	return {
		productItemId: product.id,
		productItemName: product.name,
		quantity: quantity,
		unitPrice: product.price,
		image: product.image.data
	}
}

const ProductsDisplay = ({ products, className = '', skeletonLoadingQty = 6 }: ProductsDisplayProps) => {

	const { groceryList, addGroceryItem, changeItemQuantity, removeGroceryItem } = useDraftList();
	const [addItem] = useMutation(ADD_ITEM);
	const [increaseQuantity] = useMutation(INCREASE_QUANTITY);
	const [decreaseQuantity] = useMutation(DECREASE_QUANTITY);
	const [removeItem] = useMutation(REMOVE_ITEM);

	const addItemToList = async (product: Product) => {
		await addItem({ variables: mapToItemData(groceryList, product, 1) });
		addGroceryItem(mapToGroceryItem(product, 1));
	}

	const increaseItemQuantity = async (product: Product, quantity: number) => {
		await increaseQuantity({ variables: mapToItemData(groceryList, product, quantity) })
		changeItemQuantity(mapToGroceryItem(product, quantity-1), quantity);
	}

	const decreaseItemQuantity = async (product: Product, quantity: number) => {
		await decreaseQuantity({ variables: mapToItemData(groceryList, product, quantity) })
		changeItemQuantity(mapToGroceryItem(product, quantity+1), quantity);
	}

	const removeItemFromList = async (product: Product) => {
		await removeItem({ variables: mapToItemData(groceryList, product, 0) });
		removeGroceryItem(mapToGroceryItem(product, 0));
	}

	if (!groceryList || !products) {
		return <ProductDisplaySkeleton skeletonLoadingQty={skeletonLoadingQty} className={className} />
	}

	return (
		<div className={cn("grid grid-cols-6 gap-4 py-4", className)}>
			{
				products?.map(product => (
					<ProductCard
						key={product.id}
						product={product}
						initialQuantity={getQuantityOfProductInCart(product, groceryList)}
						addItem={addItemToList}
						increseQuantity={increaseItemQuantity}
						decreaseQuantity={decreaseItemQuantity}
						removeItem={removeItemFromList}
					/>
				))
			}
		</div>
	);
}
export default ProductsDisplay;

interface ProductDisplaySkeletonProps {
	skeletonLoadingQty: number;
	className?: string;
}

const ProductDisplaySkeleton = ({ skeletonLoadingQty, className = '' }: ProductDisplaySkeletonProps) => {
	return (
		<div className={cn("grid grid-cols-6 gap-4 py-4", className)}>
			{
				Array.from({ length: skeletonLoadingQty }).map(() => (
					<ProductCardSkeleton key={skeletonUniqueId()} />
				))
			}
		</div>
	)
}
