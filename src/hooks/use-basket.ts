import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '.';
import { useAppDispatch } from '.';
import { OrderProductCount } from '../helpers/const';
import { setBasketProducts } from '../store/action';
import { getBasketProducts } from '../store/basket-process/selectors';
import { BasketProduct } from '../types/basket';
import { Product } from '../types/product';

type ResultUseBasket = [
  number,
  (evt: ChangeEvent<HTMLInputElement>) => void,
  (evt: ChangeEvent<HTMLInputElement>) => void,
  () => void,
  () => void,
];

export const useBasket = (
  basketProduct: BasketProduct,
): ResultUseBasket => {

  const dispatch = useAppDispatch();

  const {
    productCard,
    countProductCards
  } = basketProduct;

  const basketProductsList = useAppSelector(getBasketProducts).slice();
  const [formData, setFormData] = useState(countProductCards);

  const isCountValid = (value: number) => value >= OrderProductCount.MinCount && value <= OrderProductCount.MaxCount;

  const updateBasketProductsList = (product: Product, value: number) => {
    const indexAddedProduct = basketProductsList.findIndex((item: BasketProduct) => item.productCard.id === product.id);
    basketProductsList[indexAddedProduct] = {
      productCard: product,
      countProductCards: value
    };
    dispatch(setBasketProducts(basketProductsList));

  };

  const validateProductsCount = (value: number) => {
    switch (true) {
      case value < OrderProductCount.MinCount:
        setFormData(OrderProductCount.MinCount);
        updateBasketProductsList(productCard, OrderProductCount.MinCount);
        break;
      case value > OrderProductCount.MaxCount:
        setFormData(OrderProductCount.MaxCount);
        updateBasketProductsList(productCard, OrderProductCount.MaxCount);
        break;
      default:
        setFormData(value);
        updateBasketProductsList(productCard, value);
    }
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {

    if (isCountValid(Number(target.value))) {
      updateBasketProductsList(productCard, Number(target.value));
      setFormData(Number(target.value));
    }
    if (Number(target.value) > OrderProductCount.MaxCount) {
      setFormData(OrderProductCount.MaxCount);
      updateBasketProductsList(productCard, OrderProductCount.MaxCount);
    }
    else {
      setFormData(Number(target.value));
    }
  };

  const handleInputBlur = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.value) {
      setFormData(OrderProductCount.MinCount);
      updateBasketProductsList(productCard, OrderProductCount.MinCount);
    }
  };

  const handleButtonClickPrev = () => {

    validateProductsCount(formData - OrderProductCount.MinCount);
  };
  const handleButtonClickNext = () => {
    validateProductsCount(Number(formData) + OrderProductCount.MinCount);
  };

  return [
    formData,
    handleInputChange,
    handleInputBlur,
    handleButtonClickPrev,
    handleButtonClickNext,
  ];
};
