import React, { useState } from 'react';
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, QueryParameterType } from '../helpers/const';
import { getMaxProductPrice, getMinProductPrice } from '../store/product-data/selectors';
import { PriceRangeType } from '../types/query-parameters';
import { useAppDispatch, useAppSelector } from '../hooks';
import { resetFilter } from '../store/action';

type ResultUsePriceFilter = [
  PriceRangeType,
  (evt: React.ChangeEvent<HTMLInputElement>) => void,
  () => void,
  (evt: React.MouseEvent<HTMLButtonElement>) => void,
];

export const usePriceFilter = (formSearchDefault: PriceRangeType): ResultUsePriceFilter => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const minProductPrice = useAppSelector(getMinProductPrice);
  const maxProductPrice = useAppSelector(getMaxProductPrice);

  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = () => {

    if (searchParams.has(QueryParameterType.PriceMinimum) && searchParams.has(QueryParameterType.PriceMaximum)) {
      return {
        minProductPrice: searchParams.get(QueryParameterType.PriceMinimum),
        maxProductPrice: searchParams.get(QueryParameterType.PriceMaximum)
      };
    }

    if (searchParams.has(QueryParameterType.PriceMinimum) && !searchParams.has(QueryParameterType.PriceMaximum)) {
      return {
        minProductPrice: searchParams.get(QueryParameterType.PriceMinimum),
        maxProductPrice: ''
      };
    }
    if (searchParams.has(QueryParameterType.PriceMaximum) && !searchParams.has(QueryParameterType.PriceMinimum)) {
      return {
        minProductPrice: '',
        maxProductPrice: searchParams.get(QueryParameterType.PriceMaximum)
      };
    } else {
      return formSearchDefault;
    }
  };

  const [formData, setFormData] = useState(updateSearchParams());

  const deleteRepeatedSearch = (queryParameter: string) => {
    if (searchParams.has(queryParameter)) {
      searchParams.delete(queryParameter);
    }
  };

  const validatePriceValue = () => {

    const minProductPriceCurrent = Number(formData.minProductPrice);
    const maxProductPriceCurrent = Number(formData.maxProductPrice);

    deleteRepeatedSearch(QueryParameterType.PriceMinimum);
    deleteRepeatedSearch(QueryParameterType.PriceMaximum);

    switch (true) {
      case formData.minProductPrice === '' && formData.maxProductPrice === '':
        break;
      case (maxProductPriceCurrent) > maxProductPrice && (minProductPriceCurrent > maxProductPriceCurrent):
        setFormData({ ...formData, minProductPrice: Number(minProductPrice) });
        searchParams.append(QueryParameterType.PriceMinimum, String(minProductPrice));
        setSearchParams(searchParams);
        setFormData({ ...formData, maxProductPrice: Number(maxProductPrice) });
        searchParams.append(QueryParameterType.PriceMaximum, String(maxProductPrice));
        setSearchParams(searchParams);
        break;
      case minProductPriceCurrent < minProductPrice:
        setFormData({ ...formData, minProductPrice: Number(minProductPrice) });
        searchParams.append(QueryParameterType.PriceMinimum, String(minProductPrice));
        setSearchParams(searchParams);
        break;
      case maxProductPriceCurrent > maxProductPrice:
        setFormData({ ...formData, maxProductPrice: Number(maxProductPrice) });
        searchParams.append(QueryParameterType.PriceMinimum, String(maxProductPrice));
        setSearchParams(searchParams);
        break;
      case minProductPriceCurrent > maxProductPriceCurrent:
        setFormData({ ...formData, minProductPrice: Number(minProductPrice) });
        searchParams.append(QueryParameterType.PriceMinimum, String(minProductPrice));
        searchParams.append(QueryParameterType.PriceMaximum, String(formData.maxProductPrice));
        setSearchParams(searchParams);
        break;
      default:
        searchParams.append(QueryParameterType.PriceMinimum, String(formData.minProductPrice));
        searchParams.append(QueryParameterType.PriceMaximum, String(formData.maxProductPrice));
        setSearchParams(searchParams);
        break;
    }

  };

  const handleInputChangePrice = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    dispatch(resetFilter(false));
    if (evt.target.id === 'price_gte' && Number(evt.target.value) >= 0) {
      setFormData({ ...formData, minProductPrice: evt.target.value });
    }
    if (evt.target.id === 'price_lte' && Number(evt.target.value) >= 0) {
      setFormData({ ...formData, maxProductPrice: evt.target.value });
    }
  };

  const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(resetFilter(true));
    setSearchParams(undefined);
    setFormData({ ...formData,
      minProductPrice:formSearchDefault.minProductPrice,
      maxProductPrice:formSearchDefault.maxProductPrice });
    // dispatch(setCurrentCatalogPath({
    //   currentPage: DEFAULT_PAGE,
    //   search: undefined
    // }));
    navigate({
      pathname: generatePath(AppRoute.Products, {pageNumber: String(DEFAULT_PAGE)}),
      search: decodeURI('')
    });
  };

  return [
    formData,
    handleInputChangePrice,
    validatePriceValue,
    handleButtonClick
  ];
};
