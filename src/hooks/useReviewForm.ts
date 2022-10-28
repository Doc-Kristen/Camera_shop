import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';
import { fetchReviewsAction, fetchSelectedProductAction, fetchSimilarProductsAction, sendReview } from '../store/api-actions';
import { getReviewErrorStatus } from '../store/user-process/selectors';
import { ReviewPost } from '../types/review-post';

type ResultUseReviewForm = [
  ReviewPost,
  (evt: React.MouseEvent<HTMLFormElement>) => void,
  (evt: React.ChangeEvent<HTMLInputElement>) => void,
  (evt: React.ChangeEvent<HTMLInputElement>) => void,
  (evt: React.ChangeEvent<HTMLInputElement>) => void,
  (evt: React.ChangeEvent<HTMLInputElement>) => void,
  (evt: React.ChangeEvent<HTMLTextAreaElement>) => void,
];

export const useReviewForm = (formContentDefault: ReviewPost): ResultUseReviewForm => {

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const ProductId = Number(id);

  const isReviewError = useAppSelector(getReviewErrorStatus);

  const [formData, setFormData] = useState(formContentDefault);

  const sendUserReview = () => {
    dispatch(sendReview(formData)).finally(() => {
      if (!isReviewError) {
        dispatch(fetchSelectedProductAction(ProductId));
        dispatch(fetchSimilarProductsAction(ProductId));
        dispatch(fetchReviewsAction(ProductId));
      }
    });
  };

  const handleFormSubmit = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    sendUserReview();
  };

  const handleRadioRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, rating: Number(evt.target.value) });
  };

  const handleRadioUserNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, userName: (evt.target.value) });
  };

  const handleRadioAdvantageChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, advantage: (evt.target.value) });
  };

  const handleRadioDisdvantageChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, disadvantage: (evt.target.value) });
  };

  const handleTextAreaChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, review: evt.target.value });
  };

  return [
    formData,
    handleFormSubmit,
    handleRadioRatingChange,
    handleRadioUserNameChange,
    handleRadioAdvantageChange,
    handleRadioDisdvantageChange,
    handleTextAreaChange,
  ];
};
