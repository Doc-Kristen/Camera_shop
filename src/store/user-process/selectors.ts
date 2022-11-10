import { NameSpace } from '../../helpers/const';
import { State } from '../../types/state';

export const getFormOpenedStatus = (state: State): boolean => state[NameSpace.User].searchedProducts;

export const getFormBlockedStatus = (state: State): boolean => state[NameSpace.User].isFormBlocked;

export const getReviewSuccessStatus = (state: State): boolean => state[NameSpace.User].isReviewSuccess;

export const getReviewPostedStatus = (state: State): boolean => state[NameSpace.User].isReviewPosted;

export const getReviewErrorStatus = (state: State): boolean => state[NameSpace.User].isErrorSendingReview;
