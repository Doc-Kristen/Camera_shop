import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../helpers/const';
import { UserProcess } from '../../types/state';
import { resetFilter, setModalOpeningStatus, setReviewErrorStatus, setSuccessOpeningStatus } from '../action';
import { sendReview } from '../api-actions';

const initialState: UserProcess = {
  isFormOpened: false,
  isFormBlocked: false,
  isReviewPosted: false,
  isErrorSendingReview: false,
  isReviewSuccess: false,
  isFilterReset: false,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setModalOpeningStatus, (state, action) => {
        state.isFormOpened = action.payload;
      })
      .addCase(sendReview.pending, (state) => {
        state.isFormBlocked = true;
        state.isReviewPosted = true;
      })
      .addCase(sendReview.fulfilled, (state) => {
        state.isFormBlocked = false;
        state.isFormOpened = false;
        state.isReviewPosted = false;
        state.isErrorSendingReview = false;
        state.isReviewSuccess = true;
      })
      .addCase(sendReview.rejected, (state) => {
        state.isFormBlocked = false;
        state.isReviewPosted = false;
        state.isErrorSendingReview = true;
      })
      .addCase(setReviewErrorStatus, (state, action) => {
        state.isErrorSendingReview = action.payload;
      })
      .addCase(setSuccessOpeningStatus, (state, action) => {
        state.isReviewSuccess = action.payload;
      })
      .addCase(resetFilter, (state, action) => {
        state.isFilterReset = action.payload;
      });
  }
});
