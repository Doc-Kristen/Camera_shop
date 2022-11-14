import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import FormSearch from './form-search';
import { ProductDetailsType } from '../../helpers/const';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    SEARCH: {
    },
    DATA: {
      ProductDetails: ProductDetailsType.Description,
    }
  }
);

describe('Component: FormSearch', () => {
  it('should render correctly', async () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <FormSearch/>
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Поиск по сайту/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('input-form-search'), 'Тестовый поисковый запрос');

    expect(screen.getByDisplayValue(/Тестовый поисковый запрос/i)).toBeInTheDocument();

  });

});
