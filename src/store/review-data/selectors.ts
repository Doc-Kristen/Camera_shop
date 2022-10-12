import { NameSpace } from '../../helpers/const';
import { Reviews } from '../../types/review';
import { State } from '../../types/state';

export const getReviews = (state: State): Reviews => state[NameSpace.Review].reviews;

export const getReviewsErrorStatus = (state: State): boolean => state[NameSpace.Review].isReviewsError;

export const getReviewsLoadedStatus = (state: State): boolean => state[NameSpace.Review].isReviewsLoaded;
