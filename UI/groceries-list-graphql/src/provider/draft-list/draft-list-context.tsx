import type { GroceryItem, GroceryList } from "@/http/grocery-list";
import { createContext } from "react";

export const DraftListContext = createContext<{
	groceryList: GroceryList | null,
	addGroceryItem: (groceryItem: GroceryItem) => void,
	changeItemQuantity: (groceryItem: GroceryItem, quantity: number) => void,
	removeGroceryItem: (groceryItem: GroceryItem) => void,
	confirmGroceryList: (emptyGroceryList: GroceryList) => void
}>({
	groceryList: null,
	addGroceryItem: () => {},
	changeItemQuantity: () => {},
	removeGroceryItem: () => {},
	confirmGroceryList: () => {}
});