import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import Loading from './loading';

const history = createMemoryHistory();

describe('Component: Loading', () => {
  it('should render correctly', () => {

    render(
      <HistoryRoute history={history}>
        <Loading />
      </HistoryRoute>,
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
