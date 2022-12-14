import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../helpers/const';
import { basketProcess } from './basket-process/basket-process';
import { pathProcess } from './path-process/path-process';
import { productData } from './product-data/product-data';
import { reviewData } from './review-data/review-data';
import { searchData } from './search-data/search-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: productData.reducer,
  [NameSpace.Review]: reviewData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Search]: searchData.reducer,
  [NameSpace.Path]: pathProcess.reducer,
  [NameSpace.Basket]: basketProcess.reducer,
});
