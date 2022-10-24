import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import ReviewFormRatingList from './review-form-rating-list';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({});

const mockCurrentRating = 5;
const radioChangeHandle = (evt: { preventDefault: () => void }) => {
  evt.preventDefault();
};

describe('Component: ReviewFormRatingList', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <ReviewFormRatingList
            currentRating={mockCurrentRating}
            radioChangeHandle={radioChangeHandle}
            isFormDisabled={false}
            isFormRatingValid={false}
          />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Рейтинг/i)).toBeInTheDocument();
    expect(screen.getByText(/Нужно оценить товар/i)).toBeInTheDocument();
  });

});
