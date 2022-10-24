import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRoute from '../history-route/history-route';
import App from './app';
import { AppRoute } from '../../helpers/const';
import {Routes, Route} from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';

const mockStore = configureMockStore();

const store = mockStore({});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRoute history={history}>
      <App />
    </HistoryRoute>
  </Provider>
);
describe('Application Routing', () => {

  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Routes>
            <Route
              path={'/'}
              element={<MainScreen/>}
            />
            <Route
              path={'/'}
              element={<h1>MainEmpty Route</h1>}
            />
          </Routes>
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Главная страница находится в разработке. Вы будете автоматически перенаправлены на первую страницу каталога/i)).toBeInTheDocument();
    expect(screen.queryByText(/MainEmpty Route/i)).not.toBeInTheDocument();
  });

  it('should render "NotFound" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Перейти на главную страницу')).toBeInTheDocument();
  });
});
