import { gql, type TypedDocumentNode } from "@apollo/client";

export const GET_DRAFT_LIST: TypedDocumentNode<UserDraftGroceryListOutput, string> = gql`  
	query UserDraftList($userId: String!){
		userDraftGroceryList(userId: $userId) {
			id,
			userId,
			totalPrice,
			status,
			completedAt,
			items {
				productItemId,
				productItemName,
				quantity,
				unitPrice,
				image
			}
		}
	}	
`;

export const ADD_ITEM: TypedDocumentNode<ItemData, {}> = gql`
  mutation AddItemGroceryList($groceryItem: GroceryItemInput!, $groceryListId: String) {
    addItem(item: $groceryItem, groceryListId: $groceryListId){
			id,
			userId
    }
	}
`;

export const INCREASE_QUANTITY: TypedDocumentNode<ItemData, {}> = gql`
  mutation IncreaseQuantityGroceryItem($groceryItem: GroceryItemInput!, $groceryListId: String) {
		increaseQuantity(item: $groceryItem, groceryListId: $groceryListId){
			id,
			userId
		}
	}
`;

export const DECREASE_QUANTITY: TypedDocumentNode<ItemData, {}> = gql`
  mutation DecreaseQuantityGroceryItem($groceryItem: GroceryItemInput!, $groceryListId: String) {
		decreaseQuantity(item: $groceryItem, groceryListId: $groceryListId){
			id,
			userId
		}
	}
`;

export const REMOVE_ITEM: TypedDocumentNode<ItemData, {}> = gql`
  mutation RemoveGroceryItem($groceryItem: GroceryItemInput!, $groceryListId: String) {
		removeItem(item: $groceryItem, groceryListId: $groceryListId){
			id,
			userId	
		}
	}
`;

export const COMPLETE_LIST: TypedDocumentNode<CompleteListOutput, {}> = gql`
  mutation CompleteList($groceryListId: String, $userId: String) {
  	completeList(groceryListId: $groceryListId, userId: $userId){
			id,
			userId,
			totalPrice,
			status,
			completedAt,
			items {
				productItemId,
				productItemName,
				quantity,
				unitPrice,
				image
			}
		}
	}
`

export const USER_HISTORY_LISTS: TypedDocumentNode<UserHistoryGroceryListsOutput, string> = gql`
	query UserHistoryGroceryLists($userId: String!){
		userHistoryGroceryLists(userId: $userId) {
			id,
			userId,
			totalPrice,
			status,
			completedAt,
			items {
				productItemId,
				productItemName,
				quantity,
				unitPrice,
				image
			}
		}
	}
`;

interface UserDraftGroceryListOutput {
	userDraftGroceryList: GroceryList;
}

export interface GroceryList {
	id: string,
	userId: string,
	totalPrice: number,
	status: string,
	completedAt: Date,
	items: GroceryItem[]
}

export interface ItemData {
	groceryItem: GroceryItem,
	groceryListId: string
}

export interface GroceryItem {
	productItemId: string,
	productItemName: string,
	quantity: number,
	unitPrice: number,
	image: Array<number>
}

export interface CompleteListOutput {
	completeList: GroceryList
}

export interface UserHistoryGroceryListsOutput {
	userHistoryGroceryLists: GroceryList[]
}