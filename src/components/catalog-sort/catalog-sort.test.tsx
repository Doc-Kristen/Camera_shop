import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import CatalogSort from './catalog-sort';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { CurrentCatalogPathType } from '../../types/query-parameters';
import { Provider } from 'react-redux';
import { makeFakeProducts } from '../../helpers/mock';

const mockProducts = makeFakeProducts();
const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    PATH: {
      currentCatalogPath: {} as CurrentCatalogPathType
    },
    DATA: {
      minProductPrice: 'от',
      maxProductPrice: 'до',
      products: mockProducts,
      isDataLoaded: false,
    }
  }
);

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <CatalogSort />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
    expect(screen.getByTestId('sort-price-input')).toBeInTheDocument();
    expect(screen.getByTestId('sort-popular-input')).toBeInTheDocument();
    expect(screen.getByTestId('order-up')).toBeInTheDocument();
    expect(screen.getByTestId('order-down')).toBeInTheDocument();
  });
});
