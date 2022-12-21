import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import BasketPromo from './basket-promo';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    BASKET: {
      coupon: ''
    }
  }
);

describe('Component: BasketPromo', () => {
  it('should render correctly', async () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <BasketPromo />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Введите промокод/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('input-basket-promo'), 'Купон');

    expect(screen.getByDisplayValue(/Купон/i)).toBeInTheDocument();

  });

});
