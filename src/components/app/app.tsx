import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../helpers/const';
import ItemScreen from '../../pages/item-screen/item-screen';
import BasketScreen from '../../pages/basket/basket-screen';

const App = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Main}
        element={
          <CatalogScreen />
        }
      />
      <Route
        path={AppRoute.ProductById}
        element={<ItemScreen />}
      />
      <Route
        path={AppRoute.Basket}
        element={<BasketScreen />}
      />
    </Routes>
  </BrowserRouter>
);

export default App;
