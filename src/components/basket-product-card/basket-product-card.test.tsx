import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeBasketProduct, makeFakeBasketProducts } from '../../helpers/mock';
import { ProductDetailsType } from '../../helpers/const';
import thunk from 'redux-thunk';
import BasketProductCard from './basket-product-card';

const mockBasketProduct = makeFakeBasketProduct();
const mockBasketProducts = makeFakeBasketProducts();

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    DATA: {
      productDetails: ProductDetailsType.Description,
    },
    BASKET: {
      basketProducts: mockBasketProducts
    }
  }
);

describe('Component: BasketProductCard', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <BasketProductCard
            productCard={mockBasketProduct}
          />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Тестовое название камеры/i)).toBeInTheDocument();
    expect(screen.getByTestId('basket-card-item')).toBeInTheDocument();

  });

});
