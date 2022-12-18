import { Product } from '../../types/product';
import { Link } from 'react-router-dom';
import Rating from '../rating/rating';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProductDetails } from '../../store/product-data/selectors';
import { AppRoute } from '../../helpers/const';
import { getBasketProducts } from '../../store/basket-process/selectors';
import { setBasketModalOpeningStatus, setBasketProduct, setCurrentCatalogProduct } from '../../store/action';

type ProductCardProps = {
  productCard: Product;
  isActive?: boolean;
}

const ProductCard = ({ productCard, isActive }: ProductCardProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const productDetails = useAppSelector(getProductDetails);
  const basketProducts = useAppSelector(getBasketProducts);

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
      <div className="product-card__buttons"> {
        basketProducts.some((item) => item.productCard.id === productCard.id) ?
          <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.Basket}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </Link> :
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={() => {
              dispatch(setCurrentCatalogProduct(productCard));
              dispatch(setBasketProduct({
                productCard: productCard,
                countProductCards: 1
              }));
              dispatch(setBasketModalOpeningStatus(true));
            }}
          >Купить
          </button>
      }
      <Link className="btn btn--transparent" to={`/catalog/${id}/${productDetails}`}>Подробнее
      </Link>
      </div>
    </div>
  );
};

export default ProductCard;
