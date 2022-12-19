import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { APIRoute, AppRoute, OrderType, Pagination, QueryParameterType, SortingType } from '../helpers/const';
import { Product, Products } from '../types/product';
import { Promo } from '../types/promo';
import { Review, Reviews } from '../types/review';
import { ReviewPost } from '../types/review-post';
import { redirectToRoute, setCoupon, setReviewErrorStatus } from './action';
import { FetchProductByPricePayloadType, FetchProductPayloadType, FetchProductsByPriceType, FetchProductsType } from '../types/query-parameters';
import { Coupon, Order } from '../types/order';

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

export const fetchProductsAction = createAsyncThunk<FetchProductsType, FetchProductPayloadType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async ({ currentPage, params }, { extra: api }) => {

    const {
      sortType,
      orderType,
      categoryType,
      productType,
      levelType,
      priceMinimum,
      priceMaximum
    } = params;

    const { data, headers } = await api.get<Products>(APIRoute.Products, {
      params: {
        [QueryParameterType.Limit]: Pagination.CardsCount,
        [QueryParameterType.Page]: currentPage,
        [QueryParameterType.Sort]: sortType,
        [QueryParameterType.Order]: orderType,
        [QueryParameterType.Category]: categoryType,
        [QueryParameterType.Type]: productType,
        [QueryParameterType.Level]: levelType,
        [QueryParameterType.PriceMinimum]: priceMinimum,
        [QueryParameterType.PriceMaximum]: priceMaximum,
      }
    });
    return {
      data,
      productsTotalCount: Number(headers['x-total-count'])
    };
  },
);

export const fetchProductsByPriceAction = createAsyncThunk<FetchProductsByPriceType, FetchProductByPricePayloadType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchRangeProductsByPrice',
  async ({ params }, { extra: api }) => {

    const {
      categoryType,
      productType,
      levelType,
      priceMinimum,
      priceMaximum
    } = params;

    const { data } = await api.get<Products>(APIRoute.Products, {
      params: {
        [QueryParameterType.Sort]: SortingType.Price,
        [QueryParameterType.Order]: OrderType.Asc,
        [QueryParameterType.Category]: categoryType,
        [QueryParameterType.Type]: productType,
        [QueryParameterType.Level]: levelType,
        [QueryParameterType.PriceMinimum]: priceMinimum,
        [QueryParameterType.PriceMaximum]: priceMaximum,
      }
    });
    return {
      minProductPrice: data[0]?.price,
      maxProductPrice: data[data.length - 1]?.price
    };
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

export const fetchSearchQueryAction = createAsyncThunk<Products, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSearchQueryAction',
  async (searchQuery, { extra: api }) => {
    const { data } = await api.get<Products>(APIRoute.Products, {
      params: {
        [QueryParameterType.NameLike]: searchQuery,

      }
    });
    return data;
  });

export const sendCoupon = createAsyncThunk<number, Coupon, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/postCoupon',
  async (coupon, { dispatch, extra: api }) => {

    const { data } = await api.post<number>(APIRoute.Coupons, coupon);
    dispatch(setCoupon(coupon.coupon));
    return data;

  });

export const sendOrder = createAsyncThunk<number, Order, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/postOrder',
  async ({ camerasIds, coupon }, { extra: api }) => {
    const { data } = await api.post<number>(APIRoute.Order, { camerasIds, coupon });
    return data;
  });
