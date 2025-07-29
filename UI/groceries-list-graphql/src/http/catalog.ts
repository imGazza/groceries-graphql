import { gql, type TypedDocumentNode } from "@apollo/client";

export const GET_CATALOG: TypedDocumentNode<CatalogData, {}> = gql`
  query {
    catalog {
    	id,
      name,
      measurementUnit,
      measurementQuantity,
      price,
      image {
        data
      }
    }
  }
`;

export interface CatalogData {
    catalog: Product[];
}

export interface Product{
    id: string,
    name: string,
    measurementUnit: string,
    measurementQuantity: number,
    price: number,
    image: {
        data: Array<number>
    }
}