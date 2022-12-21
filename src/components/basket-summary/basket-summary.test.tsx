import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakePromo } from '../../helpers/mock';
import { ProductDetailsType } from '../../helpers/const';
import thunk from 'redux-thunk';
import BasketSummary from './basket-summary';
import { BasketProducts } from '../../types/basket';

const mockPromo = makeFakePromo();

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    DATA: {
      promo: mockPromo,
      isPromoError: false,
      productDetails: ProductDetailsType.Description
    },
    BASKET: {
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    }
  }
);

describe('Component: BasketSummary', () => {

  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <BasketSummary />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Всего/i)).toBeInTheDocument();
    expect(screen.getByText(/Скидка:/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
  });

});
