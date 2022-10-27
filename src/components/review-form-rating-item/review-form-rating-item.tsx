type ReviewFormRatingItemProps = {
  starValue: number;
  currentRating: number;
  radioChangeHandle: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isFormDisabled: boolean;
  titleRating: string;
}

const ReviewFormRatingItem = ({ starValue, currentRating, radioChangeHandle, isFormDisabled, titleRating }: ReviewFormRatingItemProps): JSX.Element => (
  <>
    <input className="visually-hidden"
      name="rate"
      value={starValue}
      id={`star-${starValue}`}
      tabIndex={starValue}
      data-testid='rating-star-item'
      type='radio'
      checked={currentRating === starValue}
      onChange={radioChangeHandle}
      disabled={isFormDisabled}
      autoFocus={starValue === 1}
    />
    <label htmlFor={`star-${starValue}`} className="rate__label" title={titleRating}>
    </label>
  </>
);

export default ReviewFormRatingItem;
