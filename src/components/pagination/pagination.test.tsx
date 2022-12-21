import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import { CurrentCatalogPathType } from '../../types/query-parameters';
import Pagination from './pagination';

const fakePagesCount = 5;

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    DATA: { isDataLoaded: true, pagesCount: fakePagesCount },
    SEARCH: {},
    PATH: {
      currentCatalogPath: {} as CurrentCatalogPathType
    }
  },
);

describe('Component: Pagination', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <Pagination
            pagesCount={fakePagesCount}
          />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByTestId('catalog-pagination')).toBeInTheDocument();
  });
});
