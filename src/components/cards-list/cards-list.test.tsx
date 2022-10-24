import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { mockProducts, mockPromo } from '../../helpers/mock';
import { ProductDetailsType } from '../../helpers/const';
import thunk from 'redux-thunk';
import {Routes, Route} from 'react-router-dom';
import CardsList from './cards-list';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    DATA: {
      promo: mockPromo,
      isPromoError: false,
      ProductDetails: ProductDetailsType.Description,
      isProductsError: true,
      products: mockProducts
    }
  }
);

describe('Component: CardsList', () => {
  it('should render correctly if server error', () => {
    history.push('/catalog/pages/1');

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <Routes>
            <Route
              path='/catalog/pages/1'
              element={<CardsList/>}
            />
          </Routes>

        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Сервер с данными о товарах недоступен. Воспользуйтесь другими разделами сайта, либо зайдите позже/i)).toBeInTheDocument();

  });

});