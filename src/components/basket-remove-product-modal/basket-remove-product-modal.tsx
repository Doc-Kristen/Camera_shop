import { useEffect } from 'react';
import { isKeyPressed } from '../../helpers/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setBasketProducts, setBasketRemoveProductModalOpeningStatus } from '../../store/action';
import { getBasketProducts, getCurrentCatalogProduct } from '../../store/basket-process/selectors';
import { BasketProducts } from '../../types/basket';

const BasketRemoveProductModal = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const {
    id,
    name,
    vendorCode,
    category,
    level,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x } = useAppSelector(getCurrentCatalogProduct);

  const basketProducts = useAppSelector(getBasketProducts).slice();

  const removeProductItem = (selectedProducts : BasketProducts, productId : number) => {
    const newBasketProducts = selectedProducts.filter((item) => item.productCard.id !== productId);
    dispatch(setBasketProducts(newBasketProducts));
    dispatch(setBasketRemoveProductModalOpeningStatus(false));
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const succesButton = document.getElementById('remove-item-modal-button');
      const buttonCloseModal = document.getElementById('close-modal-button');

      buttonCloseModal && buttonCloseModal.focus();

      buttonCloseModal && buttonCloseModal.addEventListener('keydown', (evt) => {
        if (isKeyPressed(evt, 'Tab')) {
          evt.preventDefault();
          succesButton && succesButton.focus();
        }
      });
      const keyCloseHandler = (evt: KeyboardEvent) => {
        if (isKeyPressed(evt, 'Escape')) {
          dispatch(setBasketRemoveProductModalOpeningStatus(false));
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
        <div
          className="modal__overlay"
          onClick={() => dispatch(setBasketRemoveProductModalOpeningStatus(false))}
        >
        </div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
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
                <li className="basket-item__list-item">{category}</li>
                <li className="basket-item__list-item">{level}</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--half-width"
              id='remove-item-modal-button'
              type="button"
              onClick={() => {
                removeProductItem(basketProducts, id);
              }}
            >Удалить
            </button>
            <button
              className="btn btn--transparent modal__btn modal__btn--half-width"
              onClick={() => dispatch(setBasketRemoveProductModalOpeningStatus(false))}
            >Продолжить покупки
            </button>
          </div>
          <button
            id='close-modal-button'
            className="cross-btn" type="button"
            aria-label="Закрыть попап"
            onClick={() => dispatch(setBasketRemoveProductModalOpeningStatus(false))}
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
export default BasketRemoveProductModal;
