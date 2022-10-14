import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../helpers/const';
import { UserProcess } from '../../types/state';
import { setModalOpeningStatus, setOrderErrorStatus } from '../action';
import { sendReview } from '../api-actions';

const initialState: UserProcess = {
  isFormOpened: false,
  isFormBlocked: false,
  isReviewPosted: false,
  isReviewError: false
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
        state.isReviewError = false;
      })
      .addCase(sendReview.rejected, (state) => {
        state.isFormBlocked = false;
        state.isReviewPosted = false;
        state.isReviewError = true;
      })
      .addCase(setOrderErrorStatus, (state, action) => {
        state.isReviewError = action.payload;
      });
  }
});
