import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { APIRoute } from '../helpers/const';
import { Product, Products } from '../types/product';
import { Promo } from '../types/promo';

export const fetchPromoAction = createAsyncThunk<Promo, void, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Promo>(APIRoute.Promo);
    return data;
  },
);

export const fetchProductsAction = createAsyncThunk<Products, void, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Products>(APIRoute.Products);
    return data;
  },
);

export const fetchSelectedProductAction = createAsyncThunk<Product, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSelectedProduct',
  async (productId: number, { extra: api }) => {

    const { data } = await api.get<Product>(`${APIRoute.Products}/${productId}`);
    return data;
  },
);

