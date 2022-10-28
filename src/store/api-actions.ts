import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { APIRoute, AppRoute } from '../helpers/const';
import { Product, Products } from '../types/product';
import { Promo } from '../types/promo';
import { Review, Reviews } from '../types/review';
import { ReviewPost } from '../types/review-post';
import { redirectToRoute, setReviewErrorStatus } from './action';

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
  async (productId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Product>(`${APIRoute.Products}/${productId}`);
      dispatch(fetchSimilarProductsAction(productId));
      dispatch(fetchReviewsAction(productId));
      return data;
    } catch (e) {
      dispatch(redirectToRoute(AppRoute.NotFound));
      throw e;
    }
  });

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

type reviewType = {
  id: number;
  review: ReviewPost;
};

export const sendReview = createAsyncThunk<Review, reviewType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/postReview',
  async ({ id, review }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<Review>(APIRoute.Reviews, review);
      dispatch(fetchSelectedProductAction(id));
      return data;
    } catch (e) {
      dispatch(setReviewErrorStatus(true));
      throw e;
    }
  });

