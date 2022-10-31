import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ProductDetailsType } from '../../helpers/const';
import thunk from 'redux-thunk';
import ProductScreen from './product-screen';
import HistoryRoute from '../../components/history-route/history-route';
import { makeFakeProduct, makeFakeProducts, makeFakeReviews } from '../../helpers/mock';

const mockSelectedProduct = makeFakeProduct();
const mockReviews = makeFakeReviews();
const mockProducts = makeFakeProducts();

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    DATA: {
      ProductDetails: ProductDetailsType.Description,
      selectedProduct: mockSelectedProduct,
      similarProducts: mockProducts,
      isSelectedProductError: false,
      isDataLoaded: false,
      isSimilarProductError: false
    },
    REVIEW: {
      isReviewsError: false,
      reviews: mockReviews,
    },
    USER: {
      isReviewSuccess: false,
      isFormOpened: false
    }
  }
);

describe('Component: ProductScreen', () => {
  it('should render correctly', () => {
    history.push('/catalog/4/description');
    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <ProductScreen/>
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();

    expect(screen.getByTestId('specification-button').textContent).toBe('Характеристики');
    expect(screen.getByTestId('description-button').textContent).toBe('Описание');
    expect(screen.getByTestId('review-button').textContent).toBe('Оставить свой отзыв');

  });

});
