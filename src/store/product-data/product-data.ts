import { Product, Products } from '../../types/product';
import { Promo } from '../../types/promo';
import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, ProductDetailsType } from '../../helpers/const';
import { fetchProductsAction, fetchPromoAction, fetchSelectedProductAction, fetchSimilarProductsAction } from '../api-actions';
import { setProductDetailsShown, setSelectedProductErrorStatus } from '../action';

type InitalState = {
  promo?: Promo;
  isPromoError: boolean;
  isDataLoaded: boolean;
  isProductsError: boolean;
  isSimilarProductError: boolean;
  isSelectedProductError: boolean;
  products: Products;
  selectedProduct?: Product;
  similarProducts: Products;
  ProductDetails:string;
}

const initialState: InitalState = {
  isPromoError: false,
  isDataLoaded: false,
  isProductsError: false,
  isSimilarProductError: false,
  isSelectedProductError: false,
  products: [],
  similarProducts: [],
  ProductDetails: ProductDetailsType.Description
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
      })
      .addCase(fetchSelectedProductAction.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
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
      .addCase(setSelectedProductErrorStatus, (state) => {
        state.isSelectedProductError = true;
      })
      .addCase(setProductDetailsShown, (state, action) => {
        state.ProductDetails = action.payload;
      });
  }
});
