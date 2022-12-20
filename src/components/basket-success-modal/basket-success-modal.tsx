import { useEffect } from 'react';
import { generatePath, Link, useNavigate } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE } from '../../helpers/const';
import { isKeyPressed } from '../../helpers/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setBasketSuccessOpeningStatus } from '../../store/action';
import { getCurrentCatalogPath } from '../../store/path-process/selectors';

const BasketSuccessModal = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentPage, search } = useAppSelector(getCurrentCatalogPath);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const succesButton = document.getElementById('succes-modal-button');
      const buttonCloseModal = document.getElementById('close-succes-basket-modal-button');

      buttonCloseModal && buttonCloseModal.focus();

      buttonCloseModal && buttonCloseModal.addEventListener('keydown', (evt) => {
        if (isKeyPressed(evt, 'Tab')) {
          evt.preventDefault();
          succesButton && succesButton.focus();
        }
      });
      const keyCloseHandler = (evt: KeyboardEvent) => {
        if (isKeyPressed(evt, 'Escape')) {
          dispatch(setBasketSuccessOpeningStatus(false));
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
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={() => dispatch(setBasketSuccessOpeningStatus(false))}
        >
        </div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link
              className="btn btn--transparent modal__btn"
              id='succes-modal-button'
              to={{
                pathname: generatePath(AppRoute.Products, { pageNumber: String(currentPage ? currentPage : DEFAULT_PAGE) }),
                search
              }}
              onClick={() => dispatch(setBasketSuccessOpeningStatus(false))}
            >Продолжить покупки
            </Link>
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={() => {
                navigate(AppRoute.Basket);
                dispatch(setBasketSuccessOpeningStatus(false));
              }}
            >Перейти в корзину
            </button>
          </div>
          <button
            id='close-succes-basket-modal-button'
            className="cross-btn" type="button"
            aria-label="Закрыть попап"
            onClick={() => dispatch(setBasketSuccessOpeningStatus(false))}
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
