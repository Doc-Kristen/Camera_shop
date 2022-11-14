import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import BasketScreen from './basket-screen';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    REVIEW: { isReviewsError: true },
    SEARCH: {}
  },
);

describe('Component: BasketScreen', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <BasketScreen />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Корзина/i)).toBeInTheDocument();

  });

});
