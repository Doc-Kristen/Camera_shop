import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../helpers/const';
import { SearchData } from '../../types/state';
import { removeSearchedProducts } from '../action';
import { fetchSearchQueryAction } from '../api-actions';

const initialState: SearchData = {
};

export const searchData = createSlice({
  name: NameSpace.Search,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSearchQueryAction.fulfilled, (state, action) => {
        state.searchedProducts = action.payload;
      })
      .addCase(removeSearchedProducts, (state, action) => {
        state.searchedProducts = action.payload;
      });
  }
});
