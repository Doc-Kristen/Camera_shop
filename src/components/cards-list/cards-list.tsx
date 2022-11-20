import { Product, Products } from '../../types/product';
import { useAppSelector } from '../../hooks';
import { getProductsErrorStatus } from '../../store/product-data/selectors';
import ProductCard from '../product-card/product-card';

type CardsListProps = {
  products: Products;
}

const CardsList = ({ products }: CardsListProps): JSX.Element => {

  const isProductError = useAppSelector(getProductsErrorStatus);

  if(products.length === 0) {
    return <p>По указанным критериям товары не найдены. Попробуйте поменять найстройки фильтра</p>;
  }

  if (isProductError) {
    return <p>Сервер с данными о товарах недоступен. Воспользуйтесь другими разделами сайта, либо зайдите позже.</p>;
  }

  return (
    <div
      className="cards catalog__cards"
      data-testid="catalog-cards-list"
    >
      {products
        .map((productCard: Product) => (
          <ProductCard
            key={productCard.id}
            productCard={productCard}
          />
        ))}
    </div>
  );
};

export default CardsList;
