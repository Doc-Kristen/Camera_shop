import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import HistoryRoute from '../../components/history-route/history-route';
import CatalogScreen from './catalog-screen';
import { CurrentCatalogPathType } from '../../types/query-parameters';

const fakePagesCount = 0;

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

describe('Component: CatalogScreen', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <CatalogScreen />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();

  });

});
