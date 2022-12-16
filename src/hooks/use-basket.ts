import React, { ChangeEvent, useState } from 'react';
import { useAppSelector } from '.';
import { useAppDispatch } from '.';
import { DEFAULT_STEP_PRODUCT_COUNT, MAX_PRODUCTS_COUNT_FOR_ORDER, MIN_PRODUCTS_COUNT_FOR_ORDER } from '../helpers/const';
import { setBasketProducts } from '../store/action';
import { getBasketProducts } from '../store/basket-process/selectors';
import { Product, Products } from '../types/product';

type ResultUseBasket = [
    number,
    (evt: React.ChangeEvent<HTMLInputElement>) => void,
    () => void,
    () => void
];

export const useBasket = (
  formSearchDefault: number,
  productCard: Product
): ResultUseBasket => {

  const dispatch = useAppDispatch();

  const basketProducts = useAppSelector(getBasketProducts).slice();
  const [formData, setFormData] = useState(formSearchDefault);

  const deleteProductItem = (selectedProducts : Products, productId : number) => selectedProducts.filter((item) => item.id !== productId);

  const updateBasketProducts = (products : Products, product : Product, productCount : number) => {
    const basketWithoutSelectedProduct = deleteProductItem(products, product.id);
    const updatedCountSelectedProduct = Array.from({ length: productCount }, () => product);
    const updatedBasketProducts = basketWithoutSelectedProduct.concat(updatedCountSelectedProduct);
    dispatch(setBasketProducts(updatedBasketProducts));
  };
  const validateProductsCount = (value: number) => {
    switch (true) {
      case value < MIN_PRODUCTS_COUNT_FOR_ORDER:
        setFormData(MIN_PRODUCTS_COUNT_FOR_ORDER);
        updateBasketProducts(basketProducts, productCard, MIN_PRODUCTS_COUNT_FOR_ORDER);
        break;
      case value > MAX_PRODUCTS_COUNT_FOR_ORDER:
        setFormData(MAX_PRODUCTS_COUNT_FOR_ORDER);
        updateBasketProducts(basketProducts, productCard, MAX_PRODUCTS_COUNT_FOR_ORDER);
        break;
      default:
        setFormData(value);
        updateBasketProducts(basketProducts, productCard, value);
    }
  };

  const handleInputChangeProductCount = ({ target }: ChangeEvent<HTMLInputElement>) => validateProductsCount(Number(target.value));

  const handleButtonClickPrev = () => {
    validateProductsCount(formData - DEFAULT_STEP_PRODUCT_COUNT);
  };
  const handleButtonClickNext = () => {
    validateProductsCount(formData + DEFAULT_STEP_PRODUCT_COUNT);
  };

  return [
    formData,
    handleInputChangeProductCount,
    handleButtonClickPrev,
    handleButtonClickNext
  ];
};
