import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../../helpers/const';
import { isEscapeKeyPressed } from '../../helpers/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useReviewForm } from '../../hooks/useReviewForm';
import { setModalOpeningStatus } from '../../store/action';
import { getFormBlockedStatus } from '../../store/user-process/selectors';
import ReviewFormRatingList from '../review-form-rating-list/review-form-rating-list';

const ReviewModal = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const productId = Number(id);

  const isFormDisabled = useAppSelector(getFormBlockedStatus);

  const formContentDefault = {
    cameraId: productId,
    userName: '',
    advantage: '',
    disadvantage:'',
    review: '',
    rating: 0
  };

  const [
    formData,
    handleFormSubmit,
    handleRadioChange,
    handleRadioUserNameChange,
    handleRadioAdvantageChange,
    handleRadioDisdvantageChange,
    handleTextAreaChange] = useReviewForm(formContentDefault, productId);

  useEffect(() => {
    const keyCloseHandler = (evt : KeyboardEvent) => {
      if (isEscapeKeyPressed(evt)) {
        dispatch(setModalOpeningStatus(false));
      }
    };
    document.addEventListener('keydown', keyCloseHandler);
    return () => {
      document.removeEventListener('keydown', keyCloseHandler);
    };
  }, [dispatch]);

  return(
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"
          onClick={() => dispatch(setModalOpeningStatus(false))}
        >
        </div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post"
              onSubmit={handleFormSubmit}
            >
              <div className="form-review__rate">
                <ReviewFormRatingList
                  currentRating={formData.rating}
                  radioChangeHandle={handleRadioChange}
                  isFormDisabled={isFormDisabled}

                />
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-name"
                      placeholder="Введите ваше имя"
                      value={formData.userName}
                      onChange={handleRadioUserNameChange}
                      disabled={isFormDisabled}
                      required
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-plus"
                      placeholder="Основные преимущества товара"
                      value={formData.advantage}
                      onChange={handleRadioAdvantageChange}
                      minLength={MIN_COMMENT_LENGTH}
                      maxLength={MAX_COMMENT_LENGTH}
                      disabled={isFormDisabled}
                      required
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-minus"
                      placeholder="Главные недостатки товара"
                      value={formData.disadvantage}
                      onChange={handleRadioDisdvantageChange}
                      disabled={isFormDisabled}
                      required
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      name="user-comment"
                      placeholder="Поделитесь своим опытом покупки"
                      onChange={handleTextAreaChange}
                      minLength={MIN_COMMENT_LENGTH}
                      maxLength={MAX_COMMENT_LENGTH}
                      disabled={isFormDisabled}
                    >
                    </textarea>
                  </label>
                  <div className="custom-textarea__error">Нужно добавить комментарий</div>
                </div>
              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
                disabled={isFormDisabled}
              >{isFormDisabled ? 'Отправка отзыва...' : 'Отправить отзыв'}
              </button>
            </form>
          </div>
          <button
            onClick={() => dispatch(setModalOpeningStatus(false))}
            className="cross-btn" type="button" aria-label="Закрыть попап"
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

export default ReviewModal;
