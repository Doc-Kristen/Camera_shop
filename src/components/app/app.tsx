import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../helpers/const';
import ProductScreen from '../../pages/product-screen/product-screen';
import BasketScreen from '../../pages/basket/basket-screen';
import MainScreenRoute from '../main-screen-route/main-screen-route';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import HistoryRoute from '../history-route/history-route';
import browserHistory from '../../browser-history';

const App = (): JSX.Element => (
  <HistoryRoute history={browserHistory}>
    <Routes>
      <Route path={AppRoute.Main}
        element={
          <MainScreenRoute
            mainPageIsDeveloped = {false}
            // mainPageIsDeveloped
          >
            <CatalogScreen />
          </MainScreenRoute>
        }
      />
      <Route
        path={AppRoute.Products}
        element={<CatalogScreen />}
      />
      <Route
        path={AppRoute.ProductById}
        element={<ProductScreen />}
      />
      <Route
        path={AppRoute.Basket}
        element={<BasketScreen />}
      />
      <Route
        path="*"
        element={<NotFoundScreen />}
      />
    </Routes>
  </HistoryRoute>
);

export default App;
