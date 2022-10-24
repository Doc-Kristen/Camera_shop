import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import NotFoundScreen from './not-found-screen';

const history = createMemoryHistory();

describe('Component: NotFoundSceen', () => {
  it('should render correctly', () => {

    render(
      <HistoryRoute history={history}>
        <NotFoundScreen />
      </HistoryRoute>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Перейти на главную страницу')).toBeInTheDocument();
  });

});
