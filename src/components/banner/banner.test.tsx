import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import Banner from './banner';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { mockPromo } from '../../helpers/mock';
import { ProductDetailsType } from '../../helpers/const';
import thunk from 'redux-thunk';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    DATA: { promo: mockPromo, isPromoError: false, ProductDetails: ProductDetailsType.Description }
  }
);

describe('Component: Banner', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <Banner />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Профессиональная камера от известного производителя/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

});
