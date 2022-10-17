import { useEffect } from 'react';
import { isEscapeKeyPressed } from '../../helpers/utils';
import { useAppDispatch } from '../../hooks';
import { setSuccessOpeningStatus } from '../../store/action';

const ReviewSuccess = (): JSX.Element => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    const keyCloseHandler = (evt: KeyboardEvent) => {
      if (isEscapeKeyPressed(evt)) {
        dispatch(setSuccessOpeningStatus(false));
      }
    };
    document.addEventListener('keydown', keyCloseHandler);
    return () => {
      document.removeEventListener('keydown', keyCloseHandler);
    };
  }, [dispatch]);

  return(
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={() => dispatch(setSuccessOpeningStatus(false))}
        >
        </div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={() => dispatch(setSuccessOpeningStatus(false))}
            >Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn" type="button"
            aria-label="Закрыть попап"
            onClick={() => dispatch(setSuccessOpeningStatus(false))}
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
export default ReviewSuccess;
