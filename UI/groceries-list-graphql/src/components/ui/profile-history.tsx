import { useQuery } from "@apollo/client";
import { USER_HISTORY_LISTS, type GroceryList } from "@/http/grocery-list";
import ProfileHistoryItem from "./profile-history-item";
import { useState } from "react";
import ProfileHistoryDetail from "./profile-history-detail";

interface ProfileHistoryProps {
	userId: string;
}

const ProfileHistory = ({ userId }: ProfileHistoryProps) => {

	const { data: groceryLists } = useQuery(USER_HISTORY_LISTS, { variables: { userId } });
	const [selectedList, setSelectedList] = useState<GroceryList | null>(null);
	const [detailOpen, setDetailOpen] = useState(false);

	const handleListClick = (list: GroceryList) => {
		setSelectedList(list);
		setDetailOpen(true);
	}

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{
					groceryLists?.userHistoryGroceryLists.map((list: GroceryList) =>
						<ProfileHistoryItem key={list.id} list={list} onClick={() => handleListClick(list)} />
					)
				}
			</div>
			<ProfileHistoryDetail list={selectedList} open={detailOpen} onOpenChange={setDetailOpen} />
		</>
	)
}
export default ProfileHistory;