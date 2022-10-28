import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import CatalogFilter from './catalog-filter';

const history = createMemoryHistory();

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {

    render(
      <HistoryRoute history={history}>
        <CatalogFilter />
      </HistoryRoute>,
    );

    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
  });
});
