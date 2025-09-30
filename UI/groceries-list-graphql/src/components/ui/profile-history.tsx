import { useQuery } from "@apollo/client";
import { USER_HISTORY_LISTS, type GroceryList } from "@/http/grocery-list";
import ProfileHistoryItem from "./profile-history-item";

interface ProfileHistoryProps {
	userId: string;
}

const ProfileHistory = ({ userId }: ProfileHistoryProps) => {

	const { data: groceryLists } = useQuery(USER_HISTORY_LISTS, { variables: { userId } });

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			{
				groceryLists?.userHistoryGroceryLists.map((list: GroceryList) =>
					<ProfileHistoryItem key={list.id} list={list} />
				)
			}
		</div>
	)
}
export default ProfileHistory;