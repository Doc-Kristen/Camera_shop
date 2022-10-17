import { store } from '../store/index';

type State = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

type UserProcess = {
    isFormOpened: boolean;
    isFormBlocked: boolean;
    isReviewPosted: boolean;
    isErrorSendingReview: boolean;
    isReviewSuccess: boolean;
};

export type { State, AppDispatch, UserProcess };
