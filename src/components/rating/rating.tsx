import { ratingLevels } from '../../helpers/const';
import { Product } from '../../types/product';
import RatingStars from '../rating-stars/rating-stars';

type RatingProps = {
    productCard: Product;
  }

const Rating = ({productCard} : RatingProps): JSX.Element => {
  const {
    rating,
    reviewCount

  } = productCard;
  return(
    <div className="rate product-card__rate">
      {
        ratingLevels.map((level) => (
          <RatingStars
            productCard={productCard}
            ratingLevel={level}
            key={level}
          />
        ))
      }
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
    </div>
  );
};

export default Rating;
