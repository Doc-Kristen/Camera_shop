import { Product } from '../../types/product';
import Rating from '../rating/rating';
import { AppRoute, ratingLevels } from '../../helpers/const';
import { Link } from 'react-router-dom';

type ProductCardProps = {
  productCard: Product;
}

const ProductCard = ({ productCard }: ProductCardProps): JSX.Element => {
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
        <div className="rate product-card__rate">
          {
            ratingLevels.map((level) => (
              <Rating
                productCard={productCard}
                ratingLevel={level}
                key={level}
              />
            ))
          }
          <p className="visually-hidden">Рейтинг: {productCard.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{productCard.reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Products}/${id}`}>Подробнее
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
