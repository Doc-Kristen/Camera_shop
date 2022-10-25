import { reviewData } from './review-data';


describe('Reducer: productData', () => {
  it('without additional parameters should return initial state', () => {
    expect(reviewData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        reviews: [],
        isReviewsError: false,
        isReviewsLoaded: false,
      });
  });

  // it('should update offers by load offers', () => {
  //   const state = {offers: [], favoriteOffers: [], isDataLoaded: false, isServerError: false};
  //   expect(offerData.reducer(state, {type: fetchOfferAction.fulfilled.type, payload: offers}))
  //     .toEqual({offers, favoriteOffers: [], isDataLoaded: false, isServerError: false});
  // });

  // it('should update favoriteOffers by load favoriteOffers', () => {
  //   const state = {offers: [], favoriteOffers: [], isDataLoaded: false, isServerError: false};
  //   expect(offerData.reducer(state, {type: fetchFavoriteOffersAction.fulfilled.type, payload: favoriteOffers}))
  //     .toEqual({offers: [], favoriteOffers, isDataLoaded: false, isServerError: false});
  // });
});
