import { Product } from '../../types/product';

type RatingProps = {
    productCard: Product;
    ratingLevel: number;
};

const Rating = ({ productCard, ratingLevel }: RatingProps): JSX.Element =>
  productCard.rating > ratingLevel || productCard.rating === ratingLevel ?
    <svg width="17" height="16" aria-hidden="true">
      <use xlinkHref="#icon-full-star"></use>
    </svg> :
    <svg width="17" height="16" aria-hidden="true">
      <use xlinkHref="#icon-star"></use>
    </svg>;

export default Rating;
