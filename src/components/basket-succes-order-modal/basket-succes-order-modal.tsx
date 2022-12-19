import { useEffect } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE } from '../../helpers/const';
import { isKeyPressed } from '../../helpers/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOrderSuccesStatus } from '../../store/action';
import { getCurrentCatalogPath } from '../../store/path-process/selectors';

const BasketSuccessOrderModal = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const { currentPage, search } = useAppSelector(getCurrentCatalogPath);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const succesButton = document.getElementById('succes-modal-order-button');
      const buttonCloseModal = document.getElementById('close-succes-modal-order-button');

      buttonCloseModal && buttonCloseModal.focus();

      buttonCloseModal && buttonCloseModal.addEventListener('keydown', (evt) => {
        if (isKeyPressed(evt, 'Tab')) {
          evt.preventDefault();
          succesButton && succesButton.focus();
        }
      });
      const keyCloseHandler = (evt: KeyboardEvent) => {
        if (isKeyPressed(evt, 'Escape')) {
          dispatch(setOrderSuccesStatus(false));
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
          onClick={() => dispatch(setOrderSuccesStatus(false))}
        >
        </div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true"><use xlinkHref="#icon-review-success"></use></svg>
          <div className="modal__buttons">
            <Link
              className="btn btn--purple modal__btn modal__btn--fit-width"
              to={{
                pathname: generatePath(AppRoute.Products, { pageNumber: String(currentPage ? currentPage : DEFAULT_PAGE) }),
                search
              }}
              onClick={() => dispatch(setOrderSuccesStatus(false))}
            >Вернуться к покупкам
            </Link>
          </div>
          <button
            id='close-succes-modal-order-button'
            className="cross-btn" type="button"
            aria-label="Закрыть попап"
            onClick={() => dispatch(setOrderSuccesStatus(false))}
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
export default BasketSuccessOrderModal;
