import { GET_DRAFT_LIST, type GroceryList } from "@/http/grocery-list";
import { useMemo, useState } from "react";
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

	const value = useMemo(
		() => {
			setDraftList(initialDraftList?.userDraftGroceryList ?? null);
			return {
				groceryList: draftList,
				setGroceryList: setDraftList
			}
		}, [initialDraftList, draftList]
	)

	return (
		<DraftListContext.Provider value={value}>{children}</DraftListContext.Provider>
	)
}
export default DraftListProvider;