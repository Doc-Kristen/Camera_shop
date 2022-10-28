import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import HistoryRoute from '../history-route/history-route';
import Logo from './logo';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {

    render(
      <HistoryRoute history={history}>
        <Logo />
      </HistoryRoute>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRoute history={history}>
        <Routes>
          <Route
            path="/"
            element={<h1>This is main page</h1>}
          />
          <Route
            path='*'
            element={<Logo />}
          />
        </Routes>
      </HistoryRoute>);

    expect(screen.queryByText('This is main page')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText('This is main page')).toBeInTheDocument();
  });
});
