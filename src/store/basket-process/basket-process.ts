import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../helpers/const';
import { Products } from '../../types/product';
import { BasketProcess } from '../../types/state';
import { setBasketModalOpeningStatus, setBasketProducts, setBasketSuccessOpeningStatus } from '../action';

const initialState: BasketProcess = {
  isBasketModalOpened: false,
  isBasketModalBlocked: false,
  isBasketSuccess: false,
  basketProducts: [] as Products,
};

export const basketProcess = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setBasketModalOpeningStatus, (state, action) => {
        state.isBasketModalOpened = action.payload;
      })
      .addCase(setBasketSuccessOpeningStatus, (state, action) => {
        state.isBasketSuccess = action.payload;
      })
      .addCase(setBasketProducts, (state, action) => {
        state.basketProducts = action.payload;
      });
  }
});
