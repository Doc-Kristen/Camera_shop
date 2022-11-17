import { Products } from './product';

type QueryParameters = {
    sortType: string | null;
    orderType: string | null;
  }

type CurrentCatalogPathType = {
    currentPage: number;
    search?: string;
  }

type FetchProductPayloadType = {
    currentPage: number;
    params: QueryParameters;
}

type FetchProductsType = {
  data: Products;
  productsTotalCount: number;
}

export type { QueryParameters, CurrentCatalogPathType, FetchProductPayloadType, FetchProductsType };
