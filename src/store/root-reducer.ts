import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../helpers/const';
import { productData } from './product-data/product-data';
import { reviewData } from './review-data/review-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: productData.reducer,
  [NameSpace.Review]: reviewData.reducer,
  [NameSpace.User]: userProcess.reducer
});
