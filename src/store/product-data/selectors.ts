import { NameSpace } from '../../helpers/const';
import { Product, Products } from '../../types/product';
import { Promo } from '../../types/promo';
import { State } from '../../types/state';

export const getPromo = (state: State): Promo | undefined => state[NameSpace.Data].promo;

export const getProducts = (state: State): Products => state[NameSpace.Data].products;

export const getSelectedProduct = (state: State): Product | undefined => state[NameSpace.Data].selectedProduct;

export const getSimilarProducts = (state: State): Products => state[NameSpace.Data].similarProducts;

export const getPromoErrorStatus = (state: State): boolean => state[NameSpace.Data].isPromoError;

export const getProductsErrorStatus = (state: State): boolean => state[NameSpace.Data].isProductsError;

export const getSelectedProductErrorStatus = (state: State): boolean => state[NameSpace.Data].isSelectedProductError;

export const getSimilarProductErrorStatus = (state: State): boolean => state[NameSpace.Data].isSimilarProductError;

export const getDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;

export const getProductDetails = (state: State): string => state[NameSpace.Data].productDetails;

export const getPagesCount = (state: State): number => state[NameSpace.Data].pagesCount;
