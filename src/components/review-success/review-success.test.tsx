import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import ReviewSuccess from './review-success';
import { Route, Routes } from 'react-router-dom';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    USER: {
      isReviewSuccess: true,
    }
  }
);

describe('Component: ReviewSuccess', () => {
  it('should render correctly then isReviewSuccess = true', () => {
    history.push('/catalog/pages/1/1');
    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <Routes>
            <Route
              path='/catalog/pages/1/1'
              element={
                <div>
                  <h1>This is component ReviewsList</h1>
                  {true && <ReviewSuccess />}
                </div>
              }

            />
          </Routes>

        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();

  });

  it('should not be displayed when isReviewSuccess = false', () => {
    history.push('/catalog/pages/1/1');
    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <Routes>
            <Route
              path='/catalog/pages/1/1'
              element={
                <div>
                  <h1>This is component ReviewsList</h1>
                  {false && <ReviewSuccess />}
                </div>
              }

            />
          </Routes>

        </HistoryRoute>
      </Provider>,
    );
    expect(screen.getByText(/This is component ReviewsList/i)).toBeInTheDocument();
    expect(screen.queryByText(/Спасибо за отзыв/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Вернуться к покупкам/i)).not.toBeInTheDocument();

  });

});
