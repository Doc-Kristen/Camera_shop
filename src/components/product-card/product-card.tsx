import { Product } from '../../types/product';
import { Link } from 'react-router-dom';
import Rating from '../rating/rating';
import { useAppSelector } from '../../hooks';
import { getProductDetails } from '../../store/product-data/selectors';

type ProductCardProps = {
  productCard: Product;
  isActive?: boolean;
}

const ProductCard = ({ productCard, isActive }: ProductCardProps): JSX.Element => {

  const productDetails = useAppSelector(getProductDetails);

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
    <div className={`product-card ${isActive ? 'is-active' : ''}`}>
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
        <Link className="btn btn--transparent" to={`/catalog/${id}/${productDetails}`}>Подробнее
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
