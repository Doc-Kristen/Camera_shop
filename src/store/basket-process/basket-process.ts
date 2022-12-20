import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../helpers/const';
import { BasketProducts } from '../../types/basket';
import { Product } from '../../types/product';
import { BasketProcess } from '../../types/state';
import { setBasketModalOpeningStatus, setBasketProducts, setBasketRemoveProductModalOpeningStatus, setBasketSuccessOpeningStatus, setCurrentCatalogProduct, setCoupon, setOrderSuccesStatus, setOrderErrorStatus, setStatusCoupon } from '../action';
import { sendCoupon, sendOrder } from '../api-actions';

const initialState: BasketProcess = {
  isBasketModalOpened: false,
  isBasketRemoveProductModalOpened: false,
  isBasketModalBlocked: false,
  isBasketSuccess: false,
  isCouponPosted: false,
  isOrderSuccess: false,
  isOrderPosted: false,
  isOrderError: false,
  currentCatalogProduct: {} as Product,
  basketProducts: [] as BasketProducts,
  discountPercent: null,
  coupon: ''
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
      .addCase(setCurrentCatalogProduct, (state, action) => {
        state.currentCatalogProduct = action.payload;
      })
      .addCase(setBasketRemoveProductModalOpeningStatus, (state, action) => {
        state.isBasketRemoveProductModalOpened = action.payload;
      })
      .addCase(setBasketProducts, (state, action) => {
        state.basketProducts = action.payload;
      })
      .addCase(sendCoupon.pending, (state) => {
        state.isCouponPosted = true;
      })
      .addCase(sendCoupon.fulfilled, (state, action) => {
        state.discountPercent = action.payload;
        state.isCouponValid = true;
        state.isCouponPosted = false;
      })
      .addCase(sendCoupon.rejected, (state) => {
        state.coupon = '';
        state.discountPercent = null;
        state.isCouponPosted = false;
        state.isCouponValid = false;
      })
      .addCase(setCoupon, (state, action) => {
        state.coupon = action.payload;
      })
      .addCase(setOrderSuccesStatus, (state, action) => {
        state.isOrderSuccess = action.payload;
      })
      .addCase(setOrderErrorStatus, (state, action) => {
        state.isOrderError = action.payload;
      })
      .addCase(sendOrder.pending, (state) => {
        state.isOrderSuccess = false;
        state.isOrderPosted = true;
        state.isOrderError = false;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.isOrderSuccess = true;
        state.isOrderPosted = false;
        state.isOrderError = false;
      })
      .addCase(sendOrder.rejected, (state) => {
        state.isOrderSuccess = false;
        state.isOrderPosted = false;
        state.isOrderError = true;
      })
      .addCase(setStatusCoupon, (state, action) => {
        state.isCouponValid = action.payload;
      });
  }
});
