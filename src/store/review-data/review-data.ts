import { Reviews } from '../../types/review';
import { fetchReviewsAction } from '../api-actions';
import { NameSpace } from '../../helpers/const';
import { createSlice } from '@reduxjs/toolkit';

type InitalState = {
    reviews: Reviews;
    isReviewsError: boolean;
    isReviewsLoaded: boolean;
}

const initialState: InitalState = {
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
        state.reviews = action.payload;
        state.isReviewsLoaded = false;
        state.isReviewsError = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsError = true;
        state.isReviewsLoaded = false;
      });
  }
});
