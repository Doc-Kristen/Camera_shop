import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Route, Routes } from 'react-router-dom';
import BasketSuccessModal from './basket-success-modal';
import { CurrentCatalogPathType } from '../../types/query-parameters';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    PATH: {
      currentCatalogPath: {} as CurrentCatalogPathType
    },
    BASKET: {
      isBasketSuccess: true,
    }
  }
);

describe('Component: BasketSuccessModal', () => {
  it('should render correctly then isBasketSuccess = true', () => {
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
                  <h1>This is component BasketSuccessModal</h1>
                  {true && <BasketSuccessModal />}
                </div>
              }

            />
          </Routes>

        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();

  });

  it('should not be displayed when isBasketSuccess = false', () => {
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
                  <h1>This is component BasketSuccessModal</h1>
                  {false && <BasketSuccessModal />}
                </div>
              }

            />
          </Routes>

        </HistoryRoute>
      </Provider>,
    );
    expect(screen.getByText(/This is component BasketSuccessModal/i)).toBeInTheDocument();
    expect(screen.queryByText(/Товар успешно добавлен в корзину/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Перейти в корзину/i)).not.toBeInTheDocument();

  });

});
