import { Product } from '../../types/product';

type RatingStarsProps = {
    productCard: Product;
    ratingLevel: number;
};

const RatingStars = ({ productCard, ratingLevel }: RatingStarsProps): JSX.Element =>
  productCard.rating > ratingLevel || productCard.rating === ratingLevel ?
    <svg width="17" height="16" aria-hidden="true">
      <use xlinkHref="#icon-full-star"></use>
    </svg> :
    <svg width="17" height="16" aria-hidden="true">
      <use xlinkHref="#icon-star"></use>
    </svg>;

export default RatingStars;
