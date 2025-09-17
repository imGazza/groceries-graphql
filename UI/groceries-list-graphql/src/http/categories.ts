import { gql, type TypedDocumentNode } from "@apollo/client";

export const GET_CATEGORIES: TypedDocumentNode<CategoryData, {}> = gql`
  query {
		categories {
			id,
			name,
			iconName
		}
  }
`;

export interface CategoryData{
  categories: [Category]
}

export interface Category{
	id: string,
	name: string,
	iconName: string
}