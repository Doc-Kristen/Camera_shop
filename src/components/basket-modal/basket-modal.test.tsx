import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Route, Routes } from 'react-router-dom';
import BasketModal from './basket-modal';
import { makeFakeProduct } from '../../helpers/mock';
import { Product } from '../../types/product';
import { BasketProducts } from '../../types/basket';

const mockProductCard = makeFakeProduct();

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

describe('Component: BasketModal', () => {
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
                  <h1>This is component BasketModal</h1>
                  {true && <BasketModal productCard={mockProductCard} />}
                </div>
              }

            />
          </Routes>

        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();

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
                  <h1>This is component BasketModal</h1>
                  {false && <BasketModal productCard={mockProductCard} />}
                </div>
              }

            />
          </Routes>

        </HistoryRoute>
      </Provider>,
    );
    expect(screen.getByText(/This is component BasketModal/i)).toBeInTheDocument();
    expect(screen.queryByText(/Добавить в корзину/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Добавить товар в корзину/i)).not.toBeInTheDocument();

  });

});
