import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ERROR_MESSAGE_TIME, MIN_COMMENT_LENGTH } from '../../helpers/const';
import { isEscapeKeyPressed } from '../../helpers/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useReviewForm } from '../../hooks/useReviewForm';
import { setModalOpeningStatus, setReviewErrorStatus } from '../../store/action';
import { getFormBlockedStatus, getReviewErrorStatus } from '../../store/user-process/selectors';
import ReviewError from '../review-error/review-error';
import ReviewFormRatingList from '../review-form-rating-list/review-form-rating-list';

const ReviewModal = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const productId = Number(id);

  const isFormDisabled = useAppSelector(getFormBlockedStatus);
  const isReviewError = useAppSelector(getReviewErrorStatus);

  const formContentDefault = {
    cameraId: productId,
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: 0
  };

  const [
    formData,
    handleFormSubmit,
    handleRadioRatingChange,
    handleRadioUserNameChange,
    handleRadioAdvantageChange,
    handleRadioDisdvantageChange,
    handleTextAreaChange] = useReviewForm(formContentDefault);

  const [isFormRatingValid, setIsFormRatingValid] = useState(true);

  const [isNameValid, setIsNameValid] = useState(true);

  const [isAdvantageValid, setIsAdvantageValid] = useState(true);

  const [isDisadvantageValid, setIsDisadvantageValid] = useState(true);

  const [isReviewValid, setisReviewValid] = useState(true);

  const onButtonClick = () => {
    setIsFormRatingValid(formData.rating > 0);
    setIsNameValid(formData.userName.length > 0);
    setIsAdvantageValid(formData.advantage.length > 0);
    setIsDisadvantageValid(formData.disadvantage.length > 0);
    setisReviewValid(formData.review.length > 5);
  };

  useEffect(() => {
    const keyCloseHandler = (evt: KeyboardEvent) => {
      if (isEscapeKeyPressed(evt)) {
        dispatch(setModalOpeningStatus(false));
      }
    };
    document.addEventListener('keydown', keyCloseHandler);
    return () => {
      document.removeEventListener('keydown', keyCloseHandler);
    };
  }, [dispatch]);

  if (isReviewError) {
    setTimeout(() => {
      dispatch(setReviewErrorStatus(false));
    }, ERROR_MESSAGE_TIME);
  }

  return (
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
                  radioChangeHandle={handleRadioRatingChange}
                  isFormDisabled={isFormDisabled}
                  isFormRatingValid={isFormRatingValid}
                />
                <div className={`custom-input form-review__item ${isNameValid ? '' : 'is-invalid'}`}>
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
                <div className={`custom-input form-review__item ${isAdvantageValid ? '' : 'is-invalid'}`}>
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
                      disabled={isFormDisabled}
                      required
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className={`custom-input form-review__item ${isDisadvantageValid ? '' : 'is-invalid'}`}>
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
                <div className={`custom-textarea form-review__item ${isReviewValid ? '' : 'is-invalid'}`}>
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
                      disabled={isFormDisabled}
                      required
                    >
                    </textarea>
                  </label>
                  <div className="custom-textarea__error">Нужно добавить комментарий</div>
                </div>
              </div>
              {isReviewError ? <ReviewError /> : null}
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
                onClick={onButtonClick}
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
