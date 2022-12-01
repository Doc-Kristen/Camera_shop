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

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const userSearch = evt.target.value;
    setFormData({ ...formData, searchQuery: userSearch });
    if (userSearch) { dispatch(fetchSearchQueryAction(userSearch)); }
    if (userSearch === formSearchDefault.searchQuery) {
      dispatch(removeSearchedProducts(null));
    }
  };

  const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setFormData({ ...formData, searchQuery: '' });
    dispatch(removeSearchedProducts(null));

  };

  return [
    formData,
    handleInputChange,
    handleButtonClick,
  ];
};
