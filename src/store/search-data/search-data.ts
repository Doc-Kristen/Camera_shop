import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../helpers/const';
import { SearchData } from '../../types/state';
import { fetchSearchQueryAction } from '../api-actions';

const initialState: SearchData = {
  searchedProducts: [],
};

export const searchData = createSlice({
  name: NameSpace.Search,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSearchQueryAction.fulfilled, (state, action) => {
        state.searchedProducts = action.payload;
      });
  }
});
