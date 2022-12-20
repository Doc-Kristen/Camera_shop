import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useBasket } from '../../hooks/use-basket';
import { setBasketRemoveProductModalOpeningStatus, setCurrentCatalogProduct } from '../../store/action';
import { getOrderPostedStatus } from '../../store/basket-process/selectors';
import { BasketProduct } from '../../types/basket';

type BasketProductCardProps = {
  productCard: BasketProduct;
}

const BasketProductCard = ({ productCard }: BasketProductCardProps): JSX.Element => {

  const dispatch = useAppDispatch();
  const {
    category,
    name,
    price,
    level,
    vendorCode,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x
  } = productCard.productCard;

  const isOrderPosted = useAppSelector(getOrderPostedStatus);

  const inpuPriceRef = useRef<HTMLInputElement>(null);

  const [
    formData,
    handleInputChangeProductCount,
    handleButtonClickPrev,
    handleButtonClickNext
  ] = useBasket(productCard);

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImg}, /${previewImgWebp}, /${previewImgWebp2x} 2x`} />
          <img src={`/${previewImg}`} srcSet={`/${previewImg2x}`} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{category}</li>
          <li className="basket-item__list-item">{level}</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={handleButtonClickPrev}
          disabled={isOrderPosted}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          type="number"
          id="counter1"
          ref={inpuPriceRef}
          onChange={handleInputChangeProductCount}
          value={formData}
          min="1" max="99"
          aria-label="количество товара"
          disabled={isOrderPosted}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={handleButtonClickNext}
          disabled={isOrderPosted}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{price * formData} ₽</div>
      <button
        className="cross-btn" type="button"
        aria-label="Удалить товар"
        onClick={
          () => {
            dispatch(setCurrentCatalogProduct(productCard.productCard));
            dispatch(setBasketRemoveProductModalOpeningStatus(true));
          }
        }
        disabled={isOrderPosted}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
};

export default BasketProductCard;
