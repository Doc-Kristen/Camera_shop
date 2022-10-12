import { useAppSelector } from '../../hooks';
import { getReviews } from '../../store/review-data/selectors';
import ReviewItem from '../review-item/review-item';

const ReviewsList = (): JSX.Element => {

  const reviews = useAppSelector(getReviews);

  return(
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          <map name=""></map>
          {
            reviews.map((review) =>
              (
                <ReviewItem
                  key={review.id}
                  userReview={review}
                />
              )
            )
          }
        </ul>
        <div className="review-block__buttons">
          <button className="btn btn--purple" type="button">Показать больше отзывов
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsList;