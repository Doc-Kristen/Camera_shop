import { Product } from '../../types/product';
import { Link, useLocation } from 'react-router-dom';
import Rating from '../rating/rating';

type ProductCardProps = {
  productCard: Product;
}

const ProductCard = ({ productCard }: ProductCardProps): JSX.Element => {
  const location = useLocation();

  const {
    id,
    name,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x
  } = productCard;

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImg}, /${previewImgWebp}, /${previewImgWebp2x} 2x`} />
          <img src={`/${previewImg}`} srcSet={`/${previewImg2x}`} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <Rating
          productCard={productCard}
        />
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={`${location.pathname}/${id}`}>Подробнее
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
