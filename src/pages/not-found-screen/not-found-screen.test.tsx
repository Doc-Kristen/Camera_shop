import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HistoryRoute from '../../components/history-route/history-route';
import NotFoundScreen from './not-found-screen';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  BASKET: {
    isOrderError: false
  }
});

describe('Component: NotFoundSceen', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <NotFoundScreen />
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Перейти на главную страницу')).toBeInTheDocument();
  });

  it('should redirect to MainScreen url when user clicked to link', async () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Routes>
            <Route
              path='/'
              element={<h1>This is main page</h1>}
            />
            <Route
              path='*'
              element={<NotFoundScreen />}
            />
          </Routes>
        </HistoryRoute>
      </Provider>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    expect(screen.getByRole('link')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });

});
