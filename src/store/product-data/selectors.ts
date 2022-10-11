import { NameSpace } from '../../helpers/const';
import { Product, Products } from '../../types/product';
import { Promo } from '../../types/promo';
import { State } from '../../types/state';

export const getPromo = (state: State): Promo | undefined => state[NameSpace.Data].promo;

export const getProducts = (state: State): Products => state[NameSpace.Data].products;

export const getSelectedProduct = (state: State): Product | undefined => state[NameSpace.Data].selectedProduct;

export const getSimilarProducts = (state: State): Products => state[NameSpace.Data].similarProducts;

export const getPromoErrorStatus = (state: State): boolean => state[NameSpace.Data].isPromoError;

export const getProductErrorStatus = (state: State): boolean => state[NameSpace.Data].isProductError;

export const getProductLoadedStatus = (state: State): boolean => state[NameSpace.Data].isProductLoaded;
