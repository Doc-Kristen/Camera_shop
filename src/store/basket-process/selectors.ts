import { NameSpace } from '../../helpers/const';
import { Products } from '../../types/product';
import { State } from '../../types/state';

export const geBasketModalOpenedStatus = (state: State): boolean => state[NameSpace.Basket].isBasketModalOpened;

export const getOrderBlockedStatus = (state: State): boolean => state[NameSpace.Basket].isBasketModalBlocked;

export const getBasketSuccessStatus = (state: State): boolean => state[NameSpace.Basket].isBasketSuccess;

export const getBasketProducts = (state: State): Products => state[NameSpace.Basket].basketProducts;
