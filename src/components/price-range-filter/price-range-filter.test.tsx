import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import PriceRangeFilter from './price-range-filter';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    USER: {
      isFormBlocked: false, isErrorSendingReview: false,
    },
    DATA: {
      minProductPrice: 'от',
      maxProductPrice: 'до',
      isDataLoaded: false,
    }
  }
);
describe('Component: ReviewModal', () => {
  it('should render correctly', async () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <PriceRangeFilter/>
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByTestId('price_gte')).toBeInTheDocument();
    expect(screen.getByTestId('price_lte')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('price_gte'), '1999');
    await userEvent.type(screen.getByTestId('price_lte'), '3999');

    expect(screen.getByDisplayValue(/1999/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/3999/i)).toBeInTheDocument();

  });

});

