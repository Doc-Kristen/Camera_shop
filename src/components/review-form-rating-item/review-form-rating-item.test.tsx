import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ratingValues } from '../../helpers/const';
import thunk from 'redux-thunk';
import ReviewFormRatingItem from './review-form-rating-item';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({});

const mockCurrentRating = 5;
const radioChangeHandle = (evt: { preventDefault: () => void }) => {
  evt.preventDefault();
};

describe('Component: ReviewFormRatingItem', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <ReviewFormRatingItem
            starValue={ratingValues[0].Value}
            currentRating={mockCurrentRating}
            radioChangeHandle={radioChangeHandle}
            isFormDisabled={false}
            titleRating={ratingValues[0].Title}
          />
        </HistoryRoute>
      </Provider>,
    );

    const element = screen.getByTestId('rating-star-item');
    expect(element).toBeInTheDocument();
    expect(screen.getByTitle(/Отлично/i)).toBeInTheDocument();
  });

});
