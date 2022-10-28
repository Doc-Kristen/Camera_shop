import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct, makeFakePromo } from '../../helpers/mock';
import { ProductDetailsType } from '../../helpers/const';
import thunk from 'redux-thunk';
import ProductDetailed from './product-detailed';

const mockPromo = makeFakePromo();

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockSelectedProduct = makeFakeProduct();

const store = mockStore(
  {
    DATA: {
      promo: mockPromo,
      isPromoError: false,
      ProductDetails: ProductDetailsType.Description,
    }
  }
);

describe('Component: ProductDetailed', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <ProductDetailed
            productDetailed={mockSelectedProduct}
          />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Тестовое название камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/123/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/тест description/i)).toBeInTheDocument();
  });

});
