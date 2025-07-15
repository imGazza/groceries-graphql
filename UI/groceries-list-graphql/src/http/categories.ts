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
  categories: [{
	name: string,
	  iconName: string
  }]	
}