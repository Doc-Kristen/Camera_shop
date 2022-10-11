import { Product, Products } from '../../types/product';
import { Promo } from '../../types/promo';
import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../helpers/const';
import { fetchProductsAction, fetchPromoAction, fetchSelectedProductAction, fetchSimilarProductsAction } from '../api-actions';

type InitalState = {
  promo?: Promo;
  isPromoError: boolean;
  isProductLoaded: boolean;
  isProductError: boolean;
  isSelectedProductError: boolean;
  products: Products;
  selectedProduct?: Product;
  similarProducts: Products;
}

const initialState: InitalState = {
  isPromoError: false,
  isProductLoaded: false,
  isProductError: false,
  isSelectedProductError: false,
  products: [],
  similarProducts: []
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
      })
      .addCase(fetchSelectedProductAction.pending, (state, action) => {
        state.isProductLoaded = true;
      })
      .addCase(fetchSelectedProductAction.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.isProductLoaded = false;
        state.isSelectedProductError = false;
      })
      .addCase(fetchSelectedProductAction.rejected, (state) => {
        state.isSelectedProductError = true;
        state.isProductLoaded = false;
      })
      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.isProductLoaded = true;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
        state.isProductLoaded = false;
        state.isSelectedProductError = false;
      })
      .addCase(fetchSimilarProductsAction.rejected, (state) => {
        state.isSelectedProductError = true;
        state.isProductLoaded = false;
      });
  }
});
