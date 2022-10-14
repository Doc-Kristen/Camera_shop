import { useState } from 'react';
import { useAppDispatch } from '.';
import { fetchReviewsAction, sendReview } from '../store/api-actions';
import { ReviewPost } from '../types/review-post';

type ResultUseReviewForm = [
    ReviewPost,
    (evt: React.MouseEvent<HTMLFormElement>) => void,
    (evt: React.ChangeEvent<HTMLInputElement>) => void,
    (evt: React.ChangeEvent<HTMLInputElement>) => void,
    (evt: React.ChangeEvent<HTMLInputElement>) => void,
    (evt: React.ChangeEvent<HTMLInputElement>) => void,
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => void];

export const useReviewForm = (formContentDefault: ReviewPost, urlId: number): ResultUseReviewForm => {

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState(formContentDefault);

  const sendUserReview = () => {
    dispatch(sendReview(formData)).then(()=> {
      dispatch(fetchReviewsAction(urlId));
    });
    setFormData(formContentDefault);

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
    handleTextAreaChange];
};
