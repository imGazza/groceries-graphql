import { gql, type TypedDocumentNode } from "@apollo/client";

export const GET_DRAFT_LIST: TypedDocumentNode<UserDraftGroceryListOutput, string> = gql`
  {userDraftGroceryList(userId: "688b630df77dadbe36fc33b4") {
    id,
    totalPrice,
    completedAt,
    items {
      productItemId,
      productItemName,
      quantity,
      unitPrice,
    }
}}
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
			userId,
			totalPrice,
			items {
				productItemId
			}
		}
	}
`;

interface UserDraftGroceryListOutput{
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
	unitPrice: number
}