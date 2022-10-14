import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { APIRoute } from '../helpers/const';
import { Product, Products } from '../types/product';
import { Promo } from '../types/promo';
import { Reviews } from '../types/review';
import { ReviewPost } from '../types/review-post';

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

export const fetchSimilarProductsAction = createAsyncThunk<Products, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarProducts',
  async (productId: number, { extra: api }) => {

    const { data } = await api.get<Products>(`${APIRoute.Products}/${productId}/similar`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (productId: number, { extra: api }) => {

    const { data } = await api.get<Reviews>(`${APIRoute.Products}/${productId}/reviews`);
    return data;
  },
);

export const sendReview = createAsyncThunk<void, ReviewPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/postReview',
  async (review: ReviewPost, { extra: api }) => {
    const { data } = await api.post(APIRoute.Reviews, review);
    console.log(data);
    return data;
  }
);

