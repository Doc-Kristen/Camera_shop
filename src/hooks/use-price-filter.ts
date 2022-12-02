import React, { RefObject, useState } from 'react';
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, DEFAULT_SEARCH, QueryParameterType } from '../helpers/const';
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

export const usePriceFilter = (
  formSearchDefault: PriceRangeType,
  inputMinPriceRef: RefObject<HTMLInputElement>,
  inputMaxPriceRef: RefObject<HTMLInputElement>,
): ResultUsePriceFilter => {
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

  const minProductPriceCurrent = Number(inputMinPriceRef.current?.value);
  const maxProductPriceCurrent = Number(inputMaxPriceRef.current?.value);

  const isValidMinPrice = () =>
    minProductPriceCurrent >= minProductPrice &&
    minProductPriceCurrent <= maxProductPrice;

  const isValidMaxPrice = () =>
    maxProductPriceCurrent <= maxProductPrice
    && maxProductPriceCurrent >= minProductPrice;

  const validatePriceValue = () => {

    switch (true) {
      case formData.minProductPrice === '' && formData.maxProductPrice === '':
        break;

      case isValidMinPrice() && isValidMaxPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice &&
        minProductPriceCurrent > maxProductPriceCurrent:
        setFormData({
          ...formData,
          minProductPrice: minProductPrice,
        });
        searchParams.set(QueryParameterType.PriceMinimum, String(minProductPrice));
        searchParams.set(QueryParameterType.PriceMaximum, String(formData.maxProductPrice));
        resetPageParams(searchParams);
        break;
      case isValidMinPrice() && isValidMaxPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice:
        searchParams.set(QueryParameterType.PriceMinimum, String(formData.minProductPrice));
        searchParams.set(QueryParameterType.PriceMaximum, String(formData.maxProductPrice));
        resetPageParams(searchParams);
        break;
      case (maxProductPriceCurrent === 0 || formData.maxProductPrice === '') &&
        isValidMinPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice:
        setFormData({
          ...formData,
          minProductPrice: minProductPriceCurrent,
          maxProductPrice: formSearchDefault.maxProductPrice
        });
        searchParams.set(QueryParameterType.PriceMinimum, String(minProductPriceCurrent));
        searchParams.delete(QueryParameterType.PriceMaximum);
        resetPageParams(searchParams);
        break;
      case (maxProductPriceCurrent === 0 || formData.maxProductPrice === '') &&
        !isValidMinPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice:
        setFormData({
          ...formData,
          minProductPrice: minProductPrice,
          maxProductPrice: formSearchDefault.maxProductPrice
        });
        searchParams.set(QueryParameterType.PriceMinimum, String(minProductPrice));
        searchParams.delete(QueryParameterType.PriceMaximum);
        resetPageParams(searchParams);
        break;
      case (minProductPriceCurrent === 0 || formData.minProductPrice === '') &&
        isValidMaxPrice() &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice:
        setFormData({
          ...formData,
          maxProductPrice: maxProductPriceCurrent,
          minProductPrice: formSearchDefault.minProductPrice
        });
        searchParams.set(QueryParameterType.PriceMaximum, String(maxProductPriceCurrent));
        searchParams.delete(QueryParameterType.PriceMinimum);
        resetPageParams(searchParams);
        break;
      case (minProductPriceCurrent === 0 || formData.minProductPrice === '') &&
        !isValidMaxPrice() &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice:
        setFormData({
          ...formData,
          maxProductPrice: maxProductPrice,
          minProductPrice: formSearchDefault.minProductPrice
        });
        searchParams.set(QueryParameterType.PriceMaximum, String(maxProductPrice));
        searchParams.delete(QueryParameterType.PriceMinimum);
        resetPageParams(searchParams);
        break;
      case !isValidMinPrice() && isValidMaxPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice:
        setFormData({
          ...formData,
          maxProductPrice: maxProductPriceCurrent,
          minProductPrice: minProductPrice
        });
        searchParams.set(QueryParameterType.PriceMaximum, String(maxProductPriceCurrent));
        searchParams.set(QueryParameterType.PriceMinimum, String(minProductPrice));
        resetPageParams(searchParams);
        break;
      case !isValidMaxPrice() && isValidMinPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice:
        setFormData({
          ...formData,
          minProductPrice: minProductPriceCurrent,
          maxProductPrice: maxProductPrice
        });
        searchParams.set(QueryParameterType.PriceMinimum, String(minProductPriceCurrent));
        searchParams.set(QueryParameterType.PriceMaximum, String(maxProductPrice));
        resetPageParams(searchParams);
        break;
      default:
        setFormData({
          ...formData,
          minProductPrice: minProductPrice,
          maxProductPrice: maxProductPrice
        });
        searchParams.set(QueryParameterType.PriceMinimum, String(minProductPrice));
        searchParams.set(QueryParameterType.PriceMaximum, String(maxProductPrice));
        resetPageParams(searchParams);
        break;
    }
  };

  const handleInputChangePrice = (evt: React.ChangeEvent<HTMLInputElement>) => {

    if (evt.target.id === 'price_gte' && Number(evt.target.value) >= 0) {
      setFormData({ ...formData, minProductPrice: Number(inputMinPriceRef.current?.value) });
    }
    if (evt.target.id === 'price_lte' && Number(evt.target.value) >= 0) {
      setFormData({ ...formData, maxProductPrice: Number(inputMaxPriceRef.current?.value) });
    }
  };

  const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setSearchParams(DEFAULT_SEARCH);
    setFormData({
      ...formData,
      minProductPrice: formSearchDefault.minProductPrice,
      maxProductPrice: formSearchDefault.maxProductPrice
    });
    navigate({
      pathname: generatePath(AppRoute.Products, { pageNumber: String(DEFAULT_PAGE) }),
      search: decodeURI(DEFAULT_SEARCH)
    });
  };

  return [
    formData,
    handleInputChangePrice,
    validatePriceValue,
    handleButtonClick
  ];
};
