import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '.';
import { useAppDispatch } from '.';
import { DEFAULT_STEP_PRODUCT_COUNT, MAX_PRODUCTS_COUNT_FOR_ORDER, MIN_PRODUCTS_COUNT_FOR_ORDER } from '../helpers/const';
import { setBasketProducts } from '../store/action';
import { getBasketProducts } from '../store/basket-process/selectors';
import { BasketProduct } from '../types/basket';
import { Product } from '../types/product';

type ResultUseBasket = [
  number,
  (evt: ChangeEvent<HTMLInputElement>) => void,
  () => void,
  () => void,
];

export const useBasket = (
  basketProduct: BasketProduct
): ResultUseBasket => {

  const dispatch = useAppDispatch();

  const {
    productCard,
    countProductCards
  } = basketProduct;

  const basketProductsList = useAppSelector(getBasketProducts).slice();
  const [formData, setFormData] = useState(countProductCards);

  const validateProductsCount = (value: number) => {
    switch (true) {
      case value < MIN_PRODUCTS_COUNT_FOR_ORDER:
        setFormData(MIN_PRODUCTS_COUNT_FOR_ORDER);
        break;
      case value > MAX_PRODUCTS_COUNT_FOR_ORDER:
        setFormData(MAX_PRODUCTS_COUNT_FOR_ORDER);
        break;
      default:
        setFormData(value);
    }
  };

  const updateBasketProductsList = (product: Product, value: number) => {
    const indexAddedProduct = basketProductsList.findIndex((item: BasketProduct) => item.productCard.id === product.id);
    basketProductsList[indexAddedProduct] = {
      productCard: product,
      countProductCards: value
    };
    dispatch(setBasketProducts(basketProductsList));

  };

  const handleInputChangeProductCount = ({ target }: ChangeEvent<HTMLInputElement>) => {
    validateProductsCount(Number(target.value));
    updateBasketProductsList(productCard, Number(target.value));
  };

  const handleButtonClickPrev = () => {
    validateProductsCount(formData - DEFAULT_STEP_PRODUCT_COUNT);
    updateBasketProductsList(productCard, formData - DEFAULT_STEP_PRODUCT_COUNT);
  };
  const handleButtonClickNext = () => {
    validateProductsCount(formData + DEFAULT_STEP_PRODUCT_COUNT);
    updateBasketProductsList(productCard, formData + DEFAULT_STEP_PRODUCT_COUNT);
  };

  return [
    formData,
    handleInputChangeProductCount,
    handleButtonClickPrev,
    handleButtonClickNext,
  ];
};
