import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '.';
import { sendReview } from '../store/api-actions';
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
  const productId = Number(id);

  const [formData, setFormData] = useState(formContentDefault);

  const sendUserReview = () => {
    dispatch(sendReview({
      id: productId,
      review: formData,
    }));
  };

  const handleFormSubmit = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    sendUserReview();
  };

  const handleRadioChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
    handleRadioChange,
    handleRadioUserNameChange,
    handleRadioAdvantageChange,
    handleRadioDisdvantageChange,
    handleTextAreaChange,
  ];
};
