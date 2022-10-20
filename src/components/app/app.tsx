import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../helpers/const';
import ProductScreen from '../../pages/product-screen/product-screen';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import MainScreenRoute from '../main-screen-route/main-screen-route';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import MainScreen from '../../pages/main-screen/main-screen';

const App = (): JSX.Element => (
  <Routes>
    <Route path={AppRoute.Main}
      element={
        <MainScreenRoute
          mainPageIsDeveloped = {false}
        >
          <MainScreen />
        </MainScreenRoute>
      }
    />
    <Route
      path={AppRoute.Products}
      element={<CatalogScreen />}
    />
    <Route
      path={AppRoute.DescriptionProductById}
      element={<ProductScreen />}
    />
    <Route
      path={AppRoute.SpecificationProductById}
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
);

export default App;
