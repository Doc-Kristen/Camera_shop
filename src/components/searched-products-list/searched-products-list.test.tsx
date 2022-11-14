import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import SearchedProductsList from './searched-products-list';
import { makeFakeProducts } from '../../helpers/mock';
import { ProductDetailsType } from '../../helpers/const';

const products = makeFakeProducts();

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  DATA: {
    ProductDetails: ProductDetailsType.Description,
  }
});
describe('Component: SearchedProductsList', () => {
  it('should render correctly',() => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <SearchedProductsList
            searchedProducts={products}
          />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByTestId('searched-products')).toBeInTheDocument();

  });

});
