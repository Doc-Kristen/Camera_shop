import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import { products } from '../../mock/mock';

const App = (): JSX.Element => (
  <CatalogScreen
    productCards={products}
  />
);

export default App;
