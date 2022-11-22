import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryParameterType } from '../helpers/const';
import { getMaxProductPrice, getMinProductPrice } from '../store/product-data/selectors';
import { PriceRangeType } from '../types/query-parameters';
import { useAppSelector } from '../hooks';

type ResultUsePriceFilter = [
  PriceRangeType,
  (evt: React.ChangeEvent<HTMLInputElement>) => void,
  () => void,
];

export const UsePriceFilter = (formSearchDefault: PriceRangeType): ResultUsePriceFilter => {

  const minProductPrice = useAppSelector(getMinProductPrice);
  const maxProductPrice = useAppSelector(getMaxProductPrice);

  const [searchParams, setSearchParams] = useSearchParams();

  const [formData, setFormData] = useState(formSearchDefault);

  const validatePriceValue = () => {

    switch (true) {

      case formData.minProductPrice === '' && formData.maxProductPrice === '':
        break;
      case Number(formData.minProductPrice) < 0:
        setFormData({ ...formData, minProductPrice: Number(minProductPrice) });
        searchParams.append(QueryParameterType.PriceMinimum, String(formData.minProductPrice));
        searchParams.append(QueryParameterType.PriceMaximum, String(formData.maxProductPrice));
        setSearchParams(searchParams);
        break;
      case Number(formData.minProductPrice) < minProductPrice:
        setFormData({ ...formData, minProductPrice: Number(minProductPrice) });
        searchParams.append(QueryParameterType.PriceMinimum, String(minProductPrice));
        setSearchParams(searchParams);
        break;
      case Number(formData.minProductPrice) > maxProductPrice:
        setFormData({ ...formData, minProductPrice: Number(minProductPrice) });
        searchParams.append(QueryParameterType.PriceMinimum, String(formData.minProductPrice));
        searchParams.append(QueryParameterType.PriceMaximum, String(formData.maxProductPrice));
        setSearchParams(searchParams);
        break;
      case Number(formData.maxProductPrice) < 0:
        setFormData({ ...formData, maxProductPrice: maxProductPrice});
        searchParams.append(QueryParameterType.PriceMinimum, String(formData.minProductPrice));
        searchParams.append(QueryParameterType.PriceMaximum, String(formData.maxProductPrice));
        setSearchParams(searchParams);
        break;
      case
        Number(formData.maxProductPrice) < minProductPrice:
        setFormData({ ...formData, minProductPrice: Number(minProductPrice) });
        setFormData({ ...formData, maxProductPrice: Number(maxProductPrice) });
        searchParams.append(QueryParameterType.PriceMinimum, String(formData.minProductPrice));
        searchParams.append(QueryParameterType.PriceMaximum, String(formData.maxProductPrice));
        setSearchParams(searchParams);
        break;
      case Number(formData.maxProductPrice) > maxProductPrice || Number(formData.maxProductPrice) < Number(formData.minProductPrice):
        setFormData({ ...formData, maxProductPrice: Number(maxProductPrice) });
        searchParams.append(QueryParameterType.PriceMinimum, String(formData.minProductPrice));
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
    if (evt.target.id === 'price_gte') {
      setFormData({ ...formData, minProductPrice: evt.target.value});
    }
    if (evt.target.id === 'price_lte') {
      setFormData({ ...formData, maxProductPrice: evt.target.value });
    }
  };

  return [
    formData,
    handleInputChangePrice,
    validatePriceValue
  ];
};
