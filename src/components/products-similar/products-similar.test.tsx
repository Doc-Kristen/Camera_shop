import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {mockProducts, mockPromo } from '../../helpers/mock';
import { ProductDetailsType } from '../../helpers/const';
import thunk from 'redux-thunk';
import ProductsSimilar from './products-similar';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    DATA: {
      promo: mockPromo,
      isPromoError: false,
      ProductDetails: ProductDetailsType.Description,
      productsSimilarIsError: false
    }
  }
);

describe('Component: ProductsSimilar', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <ProductsSimilar
            productsSimilar={mockProducts}
          />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

});
