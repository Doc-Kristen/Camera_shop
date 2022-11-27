import { Products } from './product';

type QueryParameters = {
  sortType: string | null;
  orderType: string | null;
  categoryType: string | null;
  productType: string | null;
  levelType: string | null;
  priceMinimum?: string | null;
  priceMaximum?: string | null;
}

type CurrentCatalogPathType = {
  currentPage: number;
  search?: string;
}

type FetchProductPayloadType = {
  currentPage: number;
  params: QueryParameters;
}

type FetchProductByPricePayloadType = {
  params:
  {
    categoryType: string | null;
    productType: string | null;
    levelType: string | null;
    priceMinimum: string | null;
    priceMaximum: string | null;
  };
}

type FetchProductsType = {
  data: Products;
  productsTotalCount: number;
}

type FetchProductsByPriceType = {
  minProductPrice: number;
  maxProductPrice: number;
}

type PriceRangeType = {
  minProductPrice: number | string | null;
  maxProductPrice:number | string | null;
};

export type { QueryParameters, CurrentCatalogPathType, FetchProductPayloadType, FetchProductsType, FetchProductByPricePayloadType, FetchProductsByPriceType, PriceRangeType };
