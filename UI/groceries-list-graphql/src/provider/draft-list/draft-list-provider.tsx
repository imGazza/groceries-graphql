import { GET_DRAFT_LIST, type GroceryItem, type GroceryList } from "@/http/grocery-list";
import { useEffect, useMemo, useState } from "react";
import { DraftListContext } from "./draft-list-context";
import { useQuery } from "@apollo/client";
import { useAuth } from "@/hooks/use-auth";

interface DraftListProviderProps{
	children: React.ReactNode
}

const DraftListProvider = ({ children }: DraftListProviderProps) => {
	const { user } = useAuth();
	const { data: initialDraftList } = useQuery(GET_DRAFT_LIST, { variables: { userId: user?.id }, skip: !user });
	const [draftList, setDraftList] = useState<GroceryList | null>(initialDraftList?.userDraftGroceryList ?? null);

	// Initially initialDraftList is null and gets a value when the graphql query completes. When that happens setDraftList is called
	useEffect(() => {
		setDraftList(initialDraftList?.userDraftGroceryList ?? null);
	}, [initialDraftList])

	const addGroceryItem = (groceryItem: GroceryItem) => {
		setDraftList((draftList) => { 
			return {
				...draftList!,
				totalPrice: draftList!.totalPrice + groceryItem.unitPrice,
				items: [...draftList!.items, groceryItem]
			}
		})
	}

	const changeItemQuantity = (groceryItem: GroceryItem, quantity: number) => {
		setDraftList((draftList) => {
			return {
				...draftList!,
				totalPrice: draftList!.totalPrice + (groceryItem.unitPrice * (quantity - groceryItem.quantity)),
				items: draftList!.items.map(i => i.productItemId === groceryItem.productItemId ? { ...i, quantity: quantity } : i)
			}
		})
	}

	const removeGroceryItem = (groceryItem: GroceryItem) => {
		setDraftList((draftList) => {
			return { 
				...draftList!, 
				totalPrice: draftList!.totalPrice - groceryItem.unitPrice,
				items: draftList!.items.filter(i => i.productItemId !== groceryItem.productItemId) }
		})
	}

	const confirmGroceryList = (emptyGroceryList: GroceryList) => {
		setDraftList(emptyGroceryList);
	}

	const value = useMemo(
		() => {
			return {
				groceryList: draftList,
				addGroceryItem,
				changeItemQuantity,
				removeGroceryItem,
				confirmGroceryList
			}
		}, [draftList, addGroceryItem, changeItemQuantity, removeGroceryItem, confirmGroceryList]
	)

	return (
		<DraftListContext.Provider value={value}>{children}</DraftListContext.Provider>
	)
}
export default DraftListProvider;