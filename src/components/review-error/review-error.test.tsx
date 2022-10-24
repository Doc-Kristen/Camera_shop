import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import ReviewError from './review-error';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    REVIEW: { isReviewsError: true }
  }
);

describe('Component: ReviewError', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <ReviewError />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Ошибка отправки. Пожалуйста, попробуйте позже./i)).toBeInTheDocument();

  });

});
