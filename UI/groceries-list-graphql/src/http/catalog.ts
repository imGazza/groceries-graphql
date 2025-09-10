import { gql, type TypedDocumentNode } from "@apollo/client";

// Create custom hook:
// A function that takes the searchTerm and returns capitalSearch, lowerSearch, upperSearch if searchTerm is passed
// A function to handle presence or not of categoryId
// Exposing a function that makes the call to BE
// Create the debounced call in search-section.tsx

export const GET_CATALOG: TypedDocumentNode<CatalogDataOutput, CatalogDataInput> = gql`
  query GetCatalog($first: Int!, $search: String){
    catalog(
      first: $first,       
      where: 
      { 
        name: {
          contains: $search
        }
      }
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
`;

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
  categoryId: string;
  search: string;
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