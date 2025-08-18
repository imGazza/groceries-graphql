import type { Product } from "@/http/catalog";
import ProductCard, { ProductCardSkeleton } from "./product-card";
import useDraftList from "@/hooks/use-draft-list";
import { getQuantityOfProductInCart } from "@/lib/draft-list-utils";
import { skeletonUniqueId } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { ADD_ITEM, INCREASE_QUANTITY, DECREASE_QUANTITY, REMOVE_ITEM } from "@/http/grocery-list";

interface ProductsDisplayProps {
	products: Product[];
	skeletonLoadingQty: number;
}

const ProductsDisplay = ({ products, skeletonLoadingQty = 6 }: ProductsDisplayProps) => {

	const { groceryList, setGroceryList } = useDraftList();
	const [addItem] = useMutation(ADD_ITEM);
	const [increaseQuantity] = useMutation(INCREASE_QUANTITY);
	const [decreaseQuantity] = useMutation(DECREASE_QUANTITY);
	const [removeItem] = useMutation(REMOVE_ITEM);

	const mapToItemData = (product: Product, quantity: number) => {
		return {
			groceryItem: mapToProductItem(product, quantity),
			groceryListId: groceryList?.id
		}
	}

	const mapToProductItem = (product: Product, quantity: number) => {
		return  {
			productItemId: product.id,
				productItemName: product.name,
				quantity: quantity,
				unitPrice: product.price
		}
	}

	const addItemToList = async (product: Product, quantity: number) => {
		await addItem({ variables: mapToItemData(product, 1) });
		setGroceryList({ ...groceryList!, items: [...groceryList!.items, mapToProductItem(product, quantity) ]});
	}

	const increaseItemQuantity = async (product: Product, quantity: number) => {
		await increaseQuantity({ variables: mapToItemData(product, quantity) })
		setGroceryList({ ...groceryList!, items: groceryList!.items.map(i => i.productItemId === product.id ? { ...i, quantity: quantity } : i)});
	}

	const decreaseItemQuantity = async (product: Product, quantity: number) => {
		await decreaseQuantity({ variables: mapToItemData(product, quantity) })
		setGroceryList({ ...groceryList!, items: groceryList!.items.map(i => i.productItemId === product.id ? { ...i, quantity: quantity } : i)});
	}

	const removeItemFromList = async (product: Product) => {
		await removeItem({ variables: mapToItemData(product, 0) });
		setGroceryList({ ...groceryList!, items: groceryList!.items.filter(i => i.productItemId !== product.id) });
	}

	if (!groceryList || !products) {
		return <ProductDisplaySkeleton skeletonLoadingQty={skeletonLoadingQty} />
	}

	return (
		<div className="grid grid-cols-6 gap-4 py-4">
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
}

const ProductDisplaySkeleton = ({ skeletonLoadingQty }: ProductDisplaySkeletonProps) => {
	return (
		<div className="grid grid-cols-6 gap-4 py-4">
			{
				Array.from({ length: skeletonLoadingQty }).map(() => (
					<ProductCardSkeleton key={skeletonUniqueId()} />
				))
			}
		</div>
	)
}
