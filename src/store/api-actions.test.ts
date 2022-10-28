import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { makeFakePostedReview, makeFakeProducts, makeFakePromo, makeFakeReviews } from '../helpers/mock';
import { APIRoute } from '../helpers/const';
import { fetchProductsAction, fetchPromoAction, fetchReviewsAction, fetchSelectedProductAction, fetchSimilarProductsAction, sendReview } from './api-actions';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch data/fetchPromo when GET /promo', async () => {
    const mockPromo = makeFakePromo();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockPromo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({ type }: Action<string>) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('should dispatch data/fetchProducts when GET /cameras', async () => {
    const mockProducts = makeFakeProducts();
    mockAPI
      .onGet(APIRoute.Products)
      .reply(200, mockProducts);

    const store = mockStore();

    await store.dispatch(fetchProductsAction());

    const actions = store.getActions().map(({ type }: Action<string>) => type);

    expect(actions).toEqual([
      fetchProductsAction.pending.type,
      fetchProductsAction.fulfilled.type
    ]);
  });

  it('should dispatch data/fetchSelectedProduct when GET /cameras/{id}', async () => {
    const mockProducts = makeFakeProducts();
    const mockId = 1;
    mockAPI
      .onGet(`${APIRoute.Products}/${mockId}`)
      .reply(200, mockProducts);

    const store = mockStore();

    await store.dispatch(fetchSelectedProductAction(mockId));

    const actions = store.getActions().map(({ type }: Action<string>) => type);

    expect(actions).toEqual([
      fetchSelectedProductAction.pending.type,
      fetchSimilarProductsAction.pending.type,
      fetchReviewsAction.pending.type,
      fetchSelectedProductAction.fulfilled.type,
    ]);
  });

  it('should dispatch data/fetchSimilarProducts when GET /cameras/id/similar', async () => {
    const mockProducts = makeFakeProducts();
    const mockId = 1;
    mockAPI
      .onGet(`${APIRoute.Products}/${mockId}/similar`)
      .reply(200, mockProducts);

    const store = mockStore();

    await store.dispatch(fetchSimilarProductsAction(mockId));

    const actions = store.getActions().map(({ type }: Action<string>) => type);

    expect(actions).toEqual([
      fetchSimilarProductsAction.pending.type,
      fetchSimilarProductsAction.fulfilled.type
    ]);
  });

  it('should dispatch data/fetchReviews when GET /cameras/id/reviews', async () => {
    const mockReviews = makeFakeReviews();
    const mockId = 1;
    mockAPI
      .onGet(`${APIRoute.Products}/${mockId}/reviews`)
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(mockId));

    const actions = store.getActions().map(({ type }: Action<string>) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch user/postReview when POST /reviews', async () => {
    const mockPostedReview = makeFakePostedReview();
    const mockId = 1;
    mockAPI
      .onPost(APIRoute.Reviews, mockPostedReview)
      .reply(201, mockPostedReview);

    const store = mockStore();

    await store.dispatch(sendReview({ id: mockId, review: mockPostedReview }));

    const actions = store.getActions().map(({ type }: Action<string>) => type);

    expect(actions).toEqual([
      sendReview.pending.type,
      fetchSelectedProductAction.pending.type,
      fetchSimilarProductsAction.pending.type,
      fetchReviewsAction.pending.type,
      sendReview.fulfilled.type
    ]);
  });

});
