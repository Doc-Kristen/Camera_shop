import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import MainScreen from './main-screen';

const history = createMemoryHistory();

describe('Component: MainScreen', () => {
  it('should render correctly', () => {

    render(
      <HistoryRoute history={history}>
        <MainScreen />
      </HistoryRoute>,
    );

    expect(screen.getByText(/Главная страница находится в разработке. Вы будете автоматически перенаправлены на первую страницу каталога/i)).toBeInTheDocument();
  });
});
