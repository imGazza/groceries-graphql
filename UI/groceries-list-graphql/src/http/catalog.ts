import { gql, type TypedDocumentNode } from "@apollo/client";

export const GET_FILTERED_CATALOG = (filters: string): TypedDocumentNode<CatalogDataOutput, CatalogDataInput> => {
  return gql`
  query GetCatalog($first: Int!){
    catalog(
      first: $first,       
      ${filters}
    )
    {
      page {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage,
        pageCount
      }
      nodes {
        id
        name
        measurementUnit
        measurementQuantity
        price
        image {
          data
        }
      }    
      totalCount
    }
  }
`
}

export interface CatalogDataOutput {
  catalog: CatalogPage;
}

export interface CatalogPage{
  page: CatalogPageInfo;
  nodes: Product[];
  totalCount: number;
}

export interface CatalogPageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageCount: number;
}

export interface CatalogDataInput {
  first: number;
}

export interface Product{
    id: string,
    name: string,
    measurementUnit: string,
    measurementQuantity: number,
    categoryId: string,
    price: number,
    image: {
      data: Array<number>
    }
}