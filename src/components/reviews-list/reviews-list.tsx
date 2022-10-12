import { MAX_REVIEWS_COUNT_PER_PAGE } from '../../helpers/const';
import { sortReviewsDayDown } from '../../helpers/utils';
import { useAppSelector } from '../../hooks';
import usePagination from '../../hooks/usePagination';
import { getReviews } from '../../store/review-data/selectors';
import ReviewItem from '../review-item/review-item';

const ReviewsList = (): JSX.Element => {

  const allReviews = useAppSelector(getReviews);
  const lastReviews = allReviews && allReviews.slice().sort(sortReviewsDayDown);

  const {
    firstContentIndex,
    lastReviewIndex,
    setlastReviewIndex
  } = usePagination({
    contentPerPage: MAX_REVIEWS_COUNT_PER_PAGE,
    count: allReviews.length,
  });

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          <map name=""></map>
          {
            lastReviews.slice(firstContentIndex, lastReviewIndex)
              .map((review) =>
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
          {
            lastReviewIndex >= lastReviews.length
              ? null
              :
              <button className="btn btn--purple" type="button" onClick={
                () => {
                  setlastReviewIndex(lastReviewIndex + MAX_REVIEWS_COUNT_PER_PAGE);
                }
              }
              >
                  Показать больше отзывов
              </button>
          }

        </div>
      </div>
    </section>
  );
};

export default ReviewsList;
