import { userProcess } from './user-process';


describe('Reducer: productData', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        isFormOpened: false,
        isFormBlocked: false,
        isReviewPosted: false,
        isErrorSendingReview: false,
        isReviewSuccess: false,
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
