import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeProduct, mockRatingLevels } from '../../helpers/mock';
import thunk from 'redux-thunk';
import RatingStars from './rating-stars';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const mockSelectedProduct = makeFakeProduct();

describe('Component: RatingStars', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <RatingStars
            productCard={mockSelectedProduct}
            ratingLevel={mockRatingLevels[4]}
          />
        </HistoryRoute>
      </Provider>,
    );

    const element = screen.getByTestId('rating-stars');
    expect(element).toBeInTheDocument();
  });

});
