import { Products } from '../../types/product';
import { Promo } from '../../types/promo';
import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../helpers/const';
import { fetchProductsAction, fetchPromoAction } from '../api-actions';

type InitalState = {
  promo?: Promo;
  isPromoError: boolean;
  isProductLoaded: boolean;
  isProductError: boolean;
  products: Products;
}

const initialState: InitalState = {
  isPromoError: false,
  isProductLoaded: false,
  isProductError: false,
  products: [],
};

export const productData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isPromoError = true;
      })
      .addCase(fetchProductsAction.pending, (state) => {
        state.isProductLoaded = true;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isProductLoaded = false;
        state.isProductError = false;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.isProductLoaded = false;
        state.isProductError = true;
      });
  }
});
