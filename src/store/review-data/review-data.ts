import { fetchReviewsAction } from '../api-actions';
import { NameSpace } from '../../helpers/const';
import { createSlice } from '@reduxjs/toolkit';
import { ReviewData } from '../../types/state';

const initialState: ReviewData = {
  reviews: [],
  isReviewsError: false,
  isReviewsLoaded: false,
};

export const reviewData = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoaded = true;
        state.isReviewsError = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.isReviewsLoaded = false;
        state.isReviewsError = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsLoaded = false;
        state.isReviewsError = true;
      });
  }
});
