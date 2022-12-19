import { NameSpace } from '../../helpers/const';
import { BasketProducts } from '../../types/basket';
import { Product } from '../../types/product';
import { State } from '../../types/state';

export const geBasketModalOpenedStatus = (state: State): boolean => state[NameSpace.Basket].isBasketModalOpened;

export const getBasketModalRemoveOpenedStatus = (state : State) : boolean => state[NameSpace.Basket].isBasketRemoveProductModalOpened;

export const getOrderBlockedStatus = (state: State): boolean => state[NameSpace.Basket].isBasketModalBlocked;

export const getBasketSuccessStatus = (state: State): boolean => state[NameSpace.Basket].isBasketSuccess;

export const getCouponPostedStatus = (state : State) : boolean => state[NameSpace.Basket].isCouponPosted;

export const getCouponValidStatus = (state : State) : boolean | undefined => state[NameSpace.Basket].isCouponValid;

export const getCurrentCatalogProduct = (state: State): Product => state[NameSpace.Basket].currentCatalogProduct;

export const getBasketProducts = (state : State) : BasketProducts => state[NameSpace.Basket].basketProducts;

export const getDiscountPercent = (state : State) : number | null => state[NameSpace.Basket].discountPercent;

export const getCoupon = (state : State) : string | undefined => state[NameSpace.Basket].coupon;