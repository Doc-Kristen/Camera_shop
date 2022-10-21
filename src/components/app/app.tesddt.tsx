import {render, screen} from '@testing-library/react';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';

test('Renders app-component', () => {
  render(<CatalogScreen/>);
  const textElement = screen.getByText(/Каталог/i);
  expect(textElement).toBeInTheDocument();
});
