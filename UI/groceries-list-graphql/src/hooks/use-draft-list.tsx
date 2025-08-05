import { DraftListContext } from "@/provider/draft-list/draft-list-context";
import { useContext } from "react"

const useDraftList = () => {
	const context = useContext(DraftListContext);

	if (context === undefined)
		throw new Error("useDraftList must be in a DraftListProvider")

	return context
}
export default useDraftList;