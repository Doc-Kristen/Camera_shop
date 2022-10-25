import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakePromo } from '../../helpers/mock';
import { AppRoute, ProductDetailsType } from '../../helpers/const';
import thunk from 'redux-thunk';
import {Routes, Route} from 'react-router-dom';
import MainScreenRoute from './main-screen-route';

const mockPromo = makeFakePromo();

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    DATA: { promo: mockPromo, isPromoError: false, ProductDetails: ProductDetailsType.Description }
  }
);

describe('Component: Banner', () => {

  it('should redirect to CatalogScreeen if mainPageIsDeveloped = {false}', () => {
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Routes>
            <Route path={AppRoute.Main}
              element={
                <MainScreenRoute
                  mainPageIsDeveloped = {false}
                >
                  <h1>This is MainScreenRout</h1>
                </MainScreenRoute>
              }
            />
            <Route
              path='/catalog/pages/1'
              element={<h1>This is catalog page</h1>}
            />
          </Routes>
        </HistoryRoute>
      </Provider>);

    expect(screen.queryByText(/This is MainScreenRout/i)).not.toBeInTheDocument();
    expect(screen.getByText(/This is catalog page/i)).toBeInTheDocument();

  });

});
