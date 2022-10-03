import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../helpers/const';
import { productData } from './product-data/product-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: productData.reducer,
});
