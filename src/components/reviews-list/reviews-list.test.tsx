import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ReviewsList from './reviews-list';
import { mockReviews } from '../../helpers/mock';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    REVIEW: {
      reviews: mockReviews,
      isReviewsError: false,
      isReviewsLoaded: false,
    },
    USER: {
      isFormBlocked: false,
      isErrorSendingReview: false,
      isFormOpened: false,
      isReviewSuccess: false,
    }
  }
);
describe('Component: ReviewsList', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <ReviewsList
            noReviews={false}
          />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByText(/Показать больше отзывов/i)).toBeInTheDocument();
    expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();

  });

});
