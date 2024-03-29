import { useEffect } from 'react';
import { OrderProductCount } from '../../helpers/const';
import { changeFormatNumber, isKeyPressed } from '../../helpers/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setBasketModalOpeningStatus, setBasketProducts, setBasketSuccessOpeningStatus } from '../../store/action';
import { getBasketProducts } from '../../store/basket-process/selectors';
import { BasketProduct } from '../../types/basket';
import { Product } from '../../types/product';

type BasketModalProps = {
  productCard: Product;
}

const BasketModal = ({ productCard }: BasketModalProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const {
    category,
    name,
    price,
    level,
    vendorCode,
    type,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x
  } = productCard;

  const basketProductsList = useAppSelector(getBasketProducts).slice();

  const addProduct = (product: Product) => {
    const indexAddedProduct = basketProductsList.findIndex((item: BasketProduct) => item.productCard.id === product.id);

    switch (indexAddedProduct === -1) {
      case true:
        basketProductsList.push({
          productCard: product,
          countProductCards: OrderProductCount.MinCount
        });
        dispatch(setBasketProducts(basketProductsList));
        break;
      case false:
        basketProductsList[indexAddedProduct] = {
          productCard: product,
          countProductCards: (basketProductsList[indexAddedProduct].countProductCards + OrderProductCount.MinCount) < OrderProductCount.MaxCount ? basketProductsList[indexAddedProduct].countProductCards + OrderProductCount.MinCount : OrderProductCount.MaxCount
        };
        dispatch(setBasketProducts(basketProductsList));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const basketButton = document.getElementById('basket-modal-button');
      const buttonCloseModal = document.getElementById('close-basket-modal-button');

      buttonCloseModal && buttonCloseModal.focus();

      buttonCloseModal && buttonCloseModal.addEventListener('keydown', (evt) => {
        if (isKeyPressed(evt, 'Tab')) {
          evt.preventDefault();
          basketButton && basketButton.focus();
        }
      });
      const keyCloseHandler = (evt: KeyboardEvent) => {
        if (isKeyPressed(evt, 'Escape')) {
          dispatch(setBasketModalOpeningStatus(false));
        }
      };
      document.addEventListener('keydown', keyCloseHandler);
      return () => {
        document.removeEventListener('keydown', keyCloseHandler);
      };
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"
          onClick={() => dispatch(setBasketModalOpeningStatus(false))}
        >
        </div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
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
                <li className="basket-item__list-item">{`${type} ${(category === 'Фотоаппарат' ? 'Фотокамера' : category).toLowerCase()}`}</li>
                <li className="basket-item__list-item">{`${level} уровень`}</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{changeFormatNumber(price)} ₽</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              id='basket-modal-button'
              type="button"
              onClick={() => {
                addProduct(productCard);
                dispatch(setBasketModalOpeningStatus(false));
                dispatch(setBasketSuccessOpeningStatus(true));
              }}
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            id='close-basket-modal-button'
            onClick={() => dispatch(setBasketModalOpeningStatus(false))}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketModal;
