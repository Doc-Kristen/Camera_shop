import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../helpers/const';
import { Product, Products } from '../../types/product';
import { BasketProcess } from '../../types/state';
import { setBasketModalOpeningStatus, setBasketProducts, setBasketProductsId, setBasketRemoveProductModalOpeningStatus, setBasketSuccessOpeningStatus, setCurrentCatalogProduct } from '../action';

const initialState: BasketProcess = {
  isBasketModalOpened: false,
  isBasketRemoveProductModalOpened: false,
  isBasketModalBlocked: false,
  isBasketSuccess: false,
  basketProducts: [] as Products,
  currentCatalogProduct: {} as Product,
  basketProductsId: [],
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
      .addCase(setBasketProducts, (state, action) => {
        state.basketProducts = action.payload;
      })
      .addCase(setBasketRemoveProductModalOpeningStatus, (state, action) => {
        state.isBasketRemoveProductModalOpened = action.payload;
      })
      .addCase(setBasketProductsId, (state, action) => {
        state.basketProductsId = action.payload;
      });
  }
});
