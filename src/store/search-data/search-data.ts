import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../helpers/const';
import { SearchData } from '../../types/state';
import { removeSearchedProducts, setSearchErrorStatus } from '../action';
import { fetchSearchQueryAction } from '../api-actions';

const initialState: SearchData = {
  isSearchedProductsError: false
};

export const searchData = createSlice({
  name: NameSpace.Search,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSearchQueryAction.fulfilled, (state, action) => {
        state.isSearchedProductsError = false;
        state.searchedProducts = action.payload;
      })
      .addCase(fetchSearchQueryAction.rejected, (state) => {
        state.isSearchedProductsError = true;
      })
      .addCase(removeSearchedProducts, (state, action) => {
        state.searchedProducts = action.payload;
      })
      .addCase(setSearchErrorStatus, (state, action) => {
        state.isSearchedProductsError = action.payload;
      });
  }
});
