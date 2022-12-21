import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import Breadcrumbs from './breadcrumbs';
import thunk from 'redux-thunk';
import { makeFakeProduct } from '../../helpers/mock';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { CurrentCatalogPathType } from '../../types/query-parameters';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockSelectedProduct = makeFakeProduct();

const store = mockStore(
  {
    DATA: {
      selectedProduct: mockSelectedProduct,
    },
    PATH: {
      currentCatalogPath: {} as CurrentCatalogPathType
    }
  }
);

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    history.push('/catalog/pages/1');

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <Routes>
            <Route
              path='/catalog/pages/1'
              element={<Breadcrumbs />}
            />
          </Routes>

        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();

  });
});
