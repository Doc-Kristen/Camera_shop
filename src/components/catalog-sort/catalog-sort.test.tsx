import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import CatalogSort from './catalog-sort';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { CurrentCatalogPathType } from '../../types/query-parameters';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    PATH: {
      currentCatalogPath: {} as CurrentCatalogPathType
    }
  }
);

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <CatalogSort />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });
});
