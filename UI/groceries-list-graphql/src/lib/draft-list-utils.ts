import type { Product } from "@/http/catalog";
import type { GroceryList } from "@/http/grocery-list";

export const getQuantityOfProductInCart = (product: Product, groceryList: GroceryList | null) => {
	if (!groceryList) return 0;
	const item = groceryList.items.find(item => item.productItemId === product.id);
	return item?.quantity ?? 0;
}