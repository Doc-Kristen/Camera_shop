import React, { ChangeEvent, RefObject, useState } from 'react';
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
  formRef: RefObject<HTMLFormElement>,
): ResultUsePriceFilter => {
  const navigate = useNavigate();

  const [isFilterActive, setIsFilterActive] = useState(false);

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

      case !minProductPriceCurrent && !maxProductPriceCurrent:
        break;
      case isFilterActive === false:
        break;
      case isValidMinPrice() && isValidMaxPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice &&
        minProductPriceCurrent > maxProductPriceCurrent:
        searchParams.set(QueryParameterType.PriceMinimum, String(formData.maxProductPrice));
        searchParams.set(QueryParameterType.PriceMaximum, String(formData.minProductPrice));
        resetPageParams(searchParams);
        setIsFilterActive(false);
        break;
      case isValidMinPrice() && isValidMaxPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice:
        searchParams.set(QueryParameterType.PriceMinimum, String(formData.minProductPrice));
        searchParams.set(QueryParameterType.PriceMaximum, String(formData.maxProductPrice));
        resetPageParams(searchParams);
        setIsFilterActive(false);
        break;
      case (maxProductPriceCurrent === 0 || formData.maxProductPrice === '') &&
        isValidMinPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice:

        searchParams.set(QueryParameterType.PriceMinimum, String(minProductPriceCurrent));
        searchParams.delete(QueryParameterType.PriceMaximum);
        resetPageParams(searchParams);
        setIsFilterActive(false);
        break;
      case (maxProductPriceCurrent === 0 || formData.maxProductPrice === '') &&
        !isValidMinPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice:

        searchParams.set(QueryParameterType.PriceMinimum, String(minProductPrice));
        searchParams.delete(QueryParameterType.PriceMaximum);
        resetPageParams(searchParams);
        setIsFilterActive(false);
        break;
      case (minProductPriceCurrent === 0 || formData.minProductPrice === '') &&
        isValidMaxPrice() &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice:

        searchParams.set(QueryParameterType.PriceMaximum, String(maxProductPriceCurrent));
        searchParams.delete(QueryParameterType.PriceMinimum);
        resetPageParams(searchParams);
        setIsFilterActive(false);
        break;
      case (minProductPriceCurrent === 0 || formData.minProductPrice === '') &&
        !isValidMaxPrice() &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice:

        searchParams.set(QueryParameterType.PriceMaximum, String(maxProductPrice));
        searchParams.delete(QueryParameterType.PriceMinimum);
        resetPageParams(searchParams);
        setIsFilterActive(false);
        break;
      case !isValidMinPrice() && isValidMaxPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice:

        searchParams.set(QueryParameterType.PriceMaximum, String(maxProductPriceCurrent));
        searchParams.set(QueryParameterType.PriceMinimum, String(minProductPrice));
        resetPageParams(searchParams);
        setIsFilterActive(false);
        break;
      case !isValidMaxPrice() && isValidMinPrice() &&
        formData.minProductPrice !== formSearchDefault.minProductPrice &&
        formData.maxProductPrice !== formSearchDefault.maxProductPrice:

        searchParams.set(QueryParameterType.PriceMinimum, String(minProductPriceCurrent));
        searchParams.set(QueryParameterType.PriceMaximum, String(maxProductPrice));
        resetPageParams(searchParams);
        setIsFilterActive(false);
        break;
      default:

        searchParams.set(QueryParameterType.PriceMinimum, String(minProductPrice));
        searchParams.set(QueryParameterType.PriceMaximum, String(maxProductPrice));
        resetPageParams(searchParams);
        setIsFilterActive(false);
        break;
    }
  };

  const handleInputChangePrice = ({ target }: ChangeEvent<HTMLInputElement>) => {

    if (target.id === 'price_gte' && Number(target.value) >= 0) {
      setIsFilterActive(true);
      setFormData({ ...formData, minProductPrice: Number(target.value) >= 0 ? Number(target.value) : '' });
    }
    if (target.id === 'price_lte') {
      setIsFilterActive(true);
      setFormData({ ...formData, maxProductPrice: Number(target.value) >= 0 ? Number(target.value) : '' });
    }

  };

  const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setSearchParams(DEFAULT_SEARCH);
    formRef.current && formRef.current.reset();
    setIsFilterActive(false);
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
