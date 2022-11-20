import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import CatalogFilter from './catalog-filter';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { CurrentCatalogPathType } from '../../types/query-parameters';

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

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <CatalogFilter />
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
  });
});
