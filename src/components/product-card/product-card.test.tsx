import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct } from '../../helpers/mock';
import { ProductDetailsType } from '../../helpers/const';
import thunk from 'redux-thunk';
import { Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ProductCard from './product-card';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockSelectedProduct = makeFakeProduct();

const store = mockStore(
  {
    DATA: {
      productDetails: ProductDetailsType.Description,
    }
  }
);

describe('Component: ProductCard', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <ProductCard
            productCard={mockSelectedProduct}
          />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Тестовое название камеры/i)).toBeInTheDocument();
    expect(screen.getByRole('link').textContent).toBe('Подробнее');
  });

  it('should redirect to ProductScreen url when user clicked to link', async () => {
    history.push('/catalog/page_1');

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Routes>
            <Route
              path='/catalog/4/description'
              element={<h1>This is product page</h1>}
            />
            <Route
              path='*'
              element={
                <ProductCard
                  productCard={mockSelectedProduct}
                />
              }
            />
          </Routes>
        </HistoryRoute>
      </Provider>);

    expect(screen.queryByText(/This is product page/i)).not.toBeInTheDocument();

    expect(screen.getByRole('link').textContent).toBe('Подробнее');

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is product page/i)).toBeInTheDocument();
  });

});
