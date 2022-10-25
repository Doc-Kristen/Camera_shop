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

});
