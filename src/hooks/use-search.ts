import { useState } from 'react';
import { useAppDispatch } from '.';
import { removeSearchedProducts } from '../store/action';
import { fetchSearchQueryAction } from '../store/api-actions';
import { SearchQuery } from '../types/search';

type ResultUseSearch = [
    SearchQuery,
  (evt: React.ChangeEvent<HTMLInputElement>) => void,
  (evt: React.MouseEvent<HTMLButtonElement>) => void,
];

export const useSearch = (formSearchDefault: SearchQuery): ResultUseSearch => {

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState(formSearchDefault);

  const sendSearchQuery = () => {
    dispatch(fetchSearchQueryAction(formData.searchQuery));
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setFormData({...formData, searchQuery: evt.target.value});
    sendSearchQuery();
  };

  const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setFormData({...formData, searchQuery: ''});
    dispatch(removeSearchedProducts(undefined));

  };

  return [
    formData,
    handleInputChange,
    handleButtonClick,
  ];
};
