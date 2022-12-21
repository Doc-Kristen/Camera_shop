import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Route, Routes } from 'react-router-dom';
import { Product } from '../../types/product';
import { BasketProducts } from '../../types/basket';
import BasketRemoveProductModal from './basket-remove-product-modal';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    BASKET: {
      isBasketModalOpened: false,
      isBasketSuccess: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
    }
  }
);

describe('Component: BasketRemoveProductModal', () => {
  it('should render correctly then isBasketRemoveProductModalOpened = true', () => {
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
                  <h1>This is component BasketRemoveProductModal</h1>
                  {true && <BasketRemoveProductModal />}
                </div>
              }

            />
          </Routes>

        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();

  });

  it('should not be displayed when isBasketRemoveProductModalOpened = false', () => {
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
                  <h1>This is component BasketRemoveProductModal</h1>
                  {false && <BasketRemoveProductModal />}
                </div>
              }

            />
          </Routes>

        </HistoryRoute>
      </Provider>,
    );
    expect(screen.getByText(/This is component BasketRemoveProductModal/i)).toBeInTheDocument();
    expect(screen.queryByText(/Удалить этот товар?/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Добавить товар в корзину/i)).not.toBeInTheDocument();

  });

});
