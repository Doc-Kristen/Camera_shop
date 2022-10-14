import ReviewFormRatingItem from '../review-form-rating-item/review-form-rating-item';
import {RatingValues} from '../../helpers/const';

type ReviewFormRatingListProps = {
    currentRating: number;
    radioChangeHandle: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    isFormDisabled: boolean;
  }

const ReviewFormRatingList = ({currentRating, radioChangeHandle, isFormDisabled} : ReviewFormRatingListProps): JSX.Element => (
  <fieldset className="rate form-review__item">
    <legend className="rate__caption">Рейтинг
      <svg width="9" height="9" aria-hidden="true">
        <use xlinkHref="#icon-snowflake"></use>
      </svg>
    </legend>
    <div className="rate__bar">
      <div className="rate__group">
        {
          RatingValues.map((rating) => (
            <ReviewFormRatingItem
              key={rating.Value}
              starValue={rating.Value}
              currentRating={currentRating}
              radioChangeHandle={radioChangeHandle}
              isFormDisabled={isFormDisabled}
              titleRating={rating.Title}
            />
          ))
        }
      </div>
      <div className="rate__progress"><span className="rate__stars">{currentRating}</span> <span>/</span> <span className="rate__all-stars">5</span>
      </div>
    </div>
    <p className="rate__message">Нужно оценить товар</p>
  </fieldset>
);

export default ReviewFormRatingList;
