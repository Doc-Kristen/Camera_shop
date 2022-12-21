import { setModalOpeningStatus, setReviewErrorStatus, setSuccessOpeningStatus } from '../action';
import { sendReview } from '../api-actions';
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

  it('should update state when sended review', () => {
    const state = {
      isFormOpened: false,
      isFormBlocked: false,
      isReviewPosted: false,
      isErrorSendingReview: false,
      isReviewSuccess: false,
    };
    expect(userProcess.reducer(state, { type: sendReview.fulfilled.type}))
      .toEqual({
        isFormOpened: false,
        isFormBlocked: false,
        isReviewPosted: false,
        isErrorSendingReview: false,
        isReviewSuccess: true,
      });
  });

  it('should update isFormBlocked, isReviewPosted  when sendReview.pending', () => {
    const state = {
      isFormOpened: true,
      isFormBlocked: false,
      isReviewPosted: false,
      isErrorSendingReview: false,
      isReviewSuccess: false,
    };
    expect(userProcess.reducer(state, { type: sendReview.pending.type}))
      .toEqual({
        isFormOpened: true,
        isFormBlocked: true,
        isReviewPosted: true,
        isErrorSendingReview: false,
        isReviewSuccess: false,
      });
  });

  it('should update isFormBlocked, isReviewPosted, isErrorSendingReview  when sendReview.rejected', () => {
    const state = {
      isFormOpened: false,
      isFormBlocked: true,
      isReviewPosted: true,
      isErrorSendingReview: false,
      isReviewSuccess: false,
    };
    expect(userProcess.reducer(state, { type: sendReview.rejected.type}))
      .toEqual({
        isFormOpened: false,
        isFormBlocked: false,
        isReviewPosted: false,
        isErrorSendingReview: true,
        isReviewSuccess: false,
      });
  });

  it('should update isFormOpened when dispatch setModalOpeningStatus', () => {
    const state = {
      isFormOpened: false,
      isFormBlocked: false,
      isReviewPosted: false,
      isErrorSendingReview: false,
      isReviewSuccess: false,
    };
    expect(userProcess.reducer(state, setModalOpeningStatus(true)))
      .toEqual({
        isFormOpened: true,
        isFormBlocked: false,
        isReviewPosted: false,
        isErrorSendingReview: false,
        isReviewSuccess: false,
      });
  });

  it('should update isErrorSendingReview when dispatch setReviewErrorStatus', () => {
    const state = {
      isFormOpened: false,
      isFormBlocked: false,
      isReviewPosted: false,
      isErrorSendingReview: false,
      isReviewSuccess: false,
    };
    expect(userProcess.reducer(state, setReviewErrorStatus(true)))
      .toEqual({
        isFormOpened: false,
        isFormBlocked: false,
        isReviewPosted: false,
        isErrorSendingReview: true,
        isReviewSuccess: false,
      });
  });

  it('should update isReviewSuccess when dispatch setSuccessOpeningStatus', () => {
    const state = {
      isFormOpened: false,
      isFormBlocked: false,
      isReviewPosted: false,
      isErrorSendingReview: false,
      isReviewSuccess: false,
    };
    expect(userProcess.reducer(state, setSuccessOpeningStatus(true)))
      .toEqual({
        isFormOpened: false,
        isFormBlocked: false,
        isReviewPosted: false,
        isErrorSendingReview: false,
        isReviewSuccess: true,
      });
  });
});
