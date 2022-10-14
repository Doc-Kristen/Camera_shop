import { NameSpace } from '../../helpers/const';
import { State } from '../../types/state';

export const getFormOpenedStatus = (state: State): boolean => state[NameSpace.User].isFormOpened;

export const getFormBlockedStatus = (state: State): boolean => state[NameSpace.User].isFormBlocked;

export const getReviewPostedStatus = (state: State): boolean => state[NameSpace.User].isReviewPosted;

export const getReviewErrorStatus = (state: State): boolean => state[NameSpace.User].isReviewError;
