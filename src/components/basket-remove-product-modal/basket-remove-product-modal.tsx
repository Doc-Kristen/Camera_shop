import { useEffect } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE } from '../../helpers/const';
import { isKeyPressed } from '../../helpers/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setBasketProducts, setBasketRemoveProductModalOpeningStatus } from '../../store/action';
import { getBasketProducts, getCurrentCatalogProduct } from '../../store/basket-process/selectors';
import { getCurrentCatalogPath } from '../../store/path-process/selectors';
import { Products } from '../../types/product';

const BasketSuccessModal = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const { currentPage, search } = useAppSelector(getCurrentCatalogPath);
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

  const basketProducts = useAppSelector(getBasketProducts);

  const deleteProductItem = (selectedProducts : Products, productId : number) => selectedProducts.filter((item) => item.id !== productId);

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
                dispatch(setBasketProducts(deleteProductItem(basketProducts, id)));
                dispatch(setBasketRemoveProductModalOpeningStatus(false));
              }}
            >Удалить
            </button>
            <Link
              className="btn btn--transparent modal__btn modal__btn--half-width"
              to={{
                pathname: generatePath(AppRoute.Products, { pageNumber: String(currentPage ? currentPage : DEFAULT_PAGE) }),
                search
              }}
              onClick={() => dispatch(setBasketRemoveProductModalOpeningStatus(false))}
            >Продолжить покупки
            </Link>
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
export default BasketSuccessModal;
