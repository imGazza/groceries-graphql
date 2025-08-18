import { GET_DRAFT_LIST, type GroceryList } from "@/http/grocery-list";
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

	const value = useMemo(
		() => {
			return {
				groceryList: draftList,
				setGroceryList: setDraftList
			}
		}, [draftList]
	)

	return (
		<DraftListContext.Provider value={value}>{children}</DraftListContext.Provider>
	)
}
export default DraftListProvider;