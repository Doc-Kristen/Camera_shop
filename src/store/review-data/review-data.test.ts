import { makeFakeReviews } from '../../helpers/mock';
import { fetchReviewsAction } from '../api-actions';
import { reviewData } from './review-data';

const reviews = makeFakeReviews();


describe('Reducer: productData', () => {
  it('without additional parameters should return initial state', () => {
    expect(reviewData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        reviews: [],
        isReviewsError: false,
        isReviewsLoaded: false,
      });
  });

  it('should update reviews by load reviews', () => {
    const state = {
      reviews: [],
      isReviewsError: false,
      isReviewsLoaded: false,
    };
    expect(reviewData.reducer(state, { type: fetchReviewsAction.fulfilled.type, payload: reviews }))
      .toEqual({
        reviews: reviews,
        isReviewsError: false,
        isReviewsLoaded: false,
      });
  });

  it('should update isReviewsLoaded, isReviewsError when fetchReviewsAction.pending', () => {
    const state = {
      reviews: [],
      isReviewsError: false,
      isReviewsLoaded: false,
    };
    expect(reviewData.reducer(state, { type: fetchReviewsAction.pending.type}))
      .toEqual({
        reviews: [],
        isReviewsError: false,
        isReviewsLoaded: true,
      });
  });

  it('should update isReviewsLoaded, isReviewsError when fetchReviewsAction.rejected', () => {
    const state = {
      reviews: [],
      isReviewsError: false,
      isReviewsLoaded: false,
    };
    expect(reviewData.reducer(state, { type: fetchReviewsAction.rejected.type}))
      .toEqual({
        reviews: [],
        isReviewsError: true,
        isReviewsLoaded: false,
      });
  });

});
