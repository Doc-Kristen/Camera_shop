// import { ratingLevels } from '../../helpers/const';
import { ratingLevels } from '../../helpers/const';
import { Review } from '../../types/review';
import RatingStars from '../rating-stars/rating-stars';

type ReviewItemProps = {
    userReview: Review;
};

const ReviewItem = ({ userReview }: ReviewItemProps): JSX.Element => {
  const {
    // id,
    // userName,
    advantage,
    disadvantage,
    review,
    rating,
    createAt,
    // cameraId
  } = userReview;

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4"></p>
        <time className="review-card__data" dateTime={createAt}>{createAt}</time>
      </div>
      <div className="rate review-card__rate">
        {
          ratingLevels.map((level) => (
            <RatingStars
              productCard={userReview}
              ratingLevel={level}
              key={level}
            />
          ))
        }
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
};

export default ReviewItem;
