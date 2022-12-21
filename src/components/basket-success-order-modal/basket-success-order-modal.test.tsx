import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Route, Routes } from 'react-router-dom';
import { CurrentCatalogPathType } from '../../types/query-parameters';
import BasketSuccessOrderModal from './basket-succes-order-modal';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    PATH: {
      currentCatalogPath: {} as CurrentCatalogPathType
    },
    BASKET: {
      isOrderSuccess: true,
      isOrderPosted: false,
      isOrderError: false,
    }
  }
);

describe('Component: BasketSuccessOrderModal', () => {
  it('should render correctly then isBasketSuccess = true', () => {
    history.push('/catalog/basket');
    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <Routes>
            <Route
              path='/catalog/basket'
              element={
                <div>
                  <h1>This is component BasketSuccessOrderModal</h1>
                  {true && <BasketSuccessOrderModal />}
                </div>
              }

            />
          </Routes>

        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();

  });

  it('should not be displayed when isBasketSuccess = false', () => {
    history.push('/catalog/basket');
    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <Routes>
            <Route
              path='/catalog/basket'
              element={
                <div>
                  <h1>This is component BasketSuccessOrderModal</h1>
                  {false && <BasketSuccessOrderModal />}
                </div>
              }

            />
          </Routes>

        </HistoryRoute>
      </Provider>,
    );
    expect(screen.getByText(/This is component BasketSuccessOrderModal/i)).toBeInTheDocument();
    expect(screen.queryByText(/Спасибо за покупку/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Вернуться к покупкам/i)).not.toBeInTheDocument();

  });

});
