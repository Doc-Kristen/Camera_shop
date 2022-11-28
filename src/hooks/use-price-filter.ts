import React, { useState } from 'react';
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, QueryParameterType } from '../helpers/const';
import { getMaxProductPrice, getMinProductPrice } from '../store/product-data/selectors';
import { PriceRangeType } from '../types/query-parameters';
import { useAppSelector } from '../hooks';
import { useResetPageParams } from './use-reset-page-params';

type ResultUsePriceFilter = [
  PriceRangeType,
  (evt: React.ChangeEvent<HTMLInputElement>) => void,
  () => void,
  (evt: React.MouseEvent<HTMLButtonElement>) => void,
];

export const usePriceFilter = (formSearchDefault: PriceRangeType): ResultUsePriceFilter => {
  const navigate = useNavigate();

  const minProductPrice = useAppSelector(getMinProductPrice);
  const maxProductPrice = useAppSelector(getMaxProductPrice);


  const [searchParams, setSearchParams] = useSearchParams();

  const [
    resetPageParams
  ] = useResetPageParams();

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

  const minProductPriceCurrent = Number(formData.minProductPrice);
  const maxProductPriceCurrent = Number(formData.maxProductPrice);

  const deleteRepeatedSearch = (queryParameter: string) => {
    if (searchParams.has(queryParameter)) {
      searchParams.delete(queryParameter);
    }
  };

  const updatePage = () => {
    setSearchParams(searchParams);
    resetPageParams(searchParams);
  };

  const isValidMinPrice = () =>
    minProductPriceCurrent >= minProductPrice &&
    minProductPriceCurrent <= maxProductPrice;

  const isValidMaxPrice = () =>
    maxProductPriceCurrent <= maxProductPrice
    && maxProductPriceCurrent >= minProductPrice;

  const validatePriceValue = () => {

    deleteRepeatedSearch(QueryParameterType.PriceMinimum);
    deleteRepeatedSearch(QueryParameterType.PriceMaximum);

    switch (true) {
      case formData.minProductPrice === '' && formData.maxProductPrice === '':
        break;
      case isValidMinPrice() && isValidMaxPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice:
        searchParams.append(QueryParameterType.PriceMinimum, String(formData.minProductPrice));
        searchParams.append(QueryParameterType.PriceMaximum, String(formData.maxProductPrice));
        updatePage();
        break;
      case (maxProductPriceCurrent === 0 || formData.maxProductPrice === '') &&
        isValidMinPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice:
        setFormData({
          ...formData,
          minProductPrice: minProductPriceCurrent,
          maxProductPrice: formSearchDefault.maxProductPrice
        });
        searchParams.append(QueryParameterType.PriceMinimum, String(minProductPriceCurrent));
        searchParams.delete(QueryParameterType.PriceMaximum);
        updatePage();
        break;
      case (maxProductPriceCurrent === 0 || formData.maxProductPrice === '') &&
        !isValidMinPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice:
        setFormData({
          ...formData,
          minProductPrice: minProductPrice,
          maxProductPrice: formSearchDefault.maxProductPrice
        });
        searchParams.append(QueryParameterType.PriceMinimum, String(minProductPrice));
        searchParams.delete(QueryParameterType.PriceMaximum);
        updatePage();
        break;
      case (minProductPriceCurrent === 0 || formData.minProductPrice === '') &&
        isValidMaxPrice() &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice:
        setFormData({
          ...formData,
          maxProductPrice: maxProductPriceCurrent,
          minProductPrice: formSearchDefault.minProductPrice
        });
        searchParams.append(QueryParameterType.PriceMaximum, String(maxProductPriceCurrent));
        searchParams.delete(QueryParameterType.PriceMinimum);
        updatePage();
        break;
      case (minProductPriceCurrent === 0 || formData.minProductPrice === '') &&
        !isValidMaxPrice() &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice:
        setFormData({
          ...formData,
          maxProductPrice: maxProductPrice,
          minProductPrice: formSearchDefault.minProductPrice
        });
        searchParams.append(QueryParameterType.PriceMaximum, String(maxProductPrice));
        searchParams.delete(QueryParameterType.PriceMinimum);
        updatePage();
        break;
      case !isValidMinPrice() && isValidMaxPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice:
        setFormData({
          ...formData,
          maxProductPrice: maxProductPriceCurrent,
          minProductPrice: minProductPrice
        });
        searchParams.append(QueryParameterType.PriceMaximum, String(maxProductPriceCurrent));
        searchParams.append(QueryParameterType.PriceMinimum, String(minProductPrice));
        updatePage();
        break;
      case !isValidMaxPrice() && isValidMinPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice:
        setFormData({
          ...formData,
          minProductPrice: minProductPriceCurrent,
          maxProductPrice: maxProductPrice
        });
        searchParams.append(QueryParameterType.PriceMinimum, String(minProductPriceCurrent));
        searchParams.append(QueryParameterType.PriceMaximum, String(maxProductPrice));
        updatePage();
        break;
      default:
        setFormData({
          ...formData,
          minProductPrice: minProductPrice,
          maxProductPrice: maxProductPrice
        });
        searchParams.append(QueryParameterType.PriceMinimum, String(minProductPrice));
        searchParams.append(QueryParameterType.PriceMaximum, String(maxProductPrice));
        updatePage();
        break;
    }
  };

  const handleInputChangePrice = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    if (evt.target.id === 'price_gte' && Number(evt.target.value) >= 0) {
      setFormData({ ...formData, minProductPrice: evt.target.value });
    }
    if (evt.target.id === 'price_lte' && Number(evt.target.value) >= 0) {
      setFormData({ ...formData, maxProductPrice: evt.target.value });
    }
  };

  const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setSearchParams(undefined);
    setFormData({
      ...formData,
      minProductPrice: formSearchDefault.minProductPrice,
      maxProductPrice: formSearchDefault.maxProductPrice
    });
    setSearchParams(undefined);
    navigate({
      pathname: generatePath(AppRoute.Products, { pageNumber: String(DEFAULT_PAGE) }),
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
