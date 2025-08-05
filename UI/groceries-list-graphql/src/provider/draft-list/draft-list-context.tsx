import type { GroceryList } from "@/http/grocery-list";
import { createContext } from "react";

export const DraftListContext = createContext<{
	groceryList: GroceryList | null,
	setGroceryList: (groceryList: GroceryList) => void
}>({
	groceryList: null,
	setGroceryList: () => {}
});