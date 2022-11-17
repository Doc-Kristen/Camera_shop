import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../helpers/const';
import { SortingProcess } from '../../types/state';
import { setOrderSortingType, setSortingType } from '../action';

const initialState: SortingProcess = {
  sortingType: '',
  orderType: ''
};

export const sortingProcess = createSlice({
  name: NameSpace.Sorting,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setSortingType, (state, action) => {
        state.sortingType = action.payload;
      })
      .addCase(setOrderSortingType, (state, action) => {
        state.orderType = action.payload;
      });
  }
});
