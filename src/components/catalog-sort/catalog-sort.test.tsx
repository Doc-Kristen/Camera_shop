import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import CatalogSort from './catalog-sort';

const history = createMemoryHistory();

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {

    render(
      <HistoryRoute history={history}>
        <CatalogSort />
      </HistoryRoute>,
    );

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });
});
