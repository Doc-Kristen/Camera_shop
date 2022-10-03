import { Product } from '../../types/product';
import { useAppSelector } from '../../hooks';
import { getProductErrorStatus, getProducts } from '../../store/product-data/selectors';
import ProductCard from '../product-card/product-card';

const CardList = (): JSX.Element => {
  const products = useAppSelector(getProducts);
  const isProductError = useAppSelector(getProductErrorStatus);

  if (isProductError) {
    return <p>Сервер с данными о товарах недоступен. Воспользуйтесь другими разделами сайта, либо зайдите позже.</p>;
  }

  return (
    <div className="cards catalog__cards">
      {products.map((productCard: Product) => (
        <ProductCard
          key={productCard.id}
          productCard={productCard}
        />
      ))}
    </div>);
};

export default CardList;
