import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, ProductDetailsType } from '../../helpers/const';
import { fetchProductsAction, fetchPromoAction, fetchSelectedProductAction, fetchSimilarProductsAction } from '../api-actions';
import { setProductDetailsShown, setSelectedProductErrorStatus } from '../action';
import { ProductData } from '../../types/state';
import { Product } from '../../types/product';

const initialState: ProductData = {
  isPromoError: false,
  isDataLoaded: false,
  isProductsError: false,
  isSimilarProductError: false,
  isSelectedProductError: false,
  selectedProduct: {} as Product,
  products: [],
  similarProducts: [],
  productDetails: ProductDetailsType.Description
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
        state.isDataLoaded = true;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.isDataLoaded = false;
        state.isProductsError = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.isDataLoaded = false;
        state.isProductsError = true;
      })
      .addCase(fetchSelectedProductAction.pending, (state) => {
        state.isDataLoaded = true;
        state.isSelectedProductError = false;
      })
      .addCase(fetchSelectedProductAction.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.isDataLoaded = false;
        state.isSelectedProductError = false;
      })
      .addCase(fetchSelectedProductAction.rejected, (state) => {
        state.isSelectedProductError = true;
        state.isDataLoaded = false;
      })
      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.isDataLoaded = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProductsAction.rejected, (state) => {
        state.isDataLoaded = false;
        state.isSimilarProductError = true;
      })
      .addCase(setSelectedProductErrorStatus, (state, action) => {
        state.isSelectedProductError = action.payload;
      })
      .addCase(setProductDetailsShown, (state, action) => {
        state.productDetails = action.payload;
      });
  }
});
