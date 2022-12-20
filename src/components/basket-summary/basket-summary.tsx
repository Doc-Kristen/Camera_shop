import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendOrder } from '../../store/api-actions';
import { getBasketProducts, getCoupon, getDiscountPercent, getOrderPostedStatus } from '../../store/basket-process/selectors';
import { BasketProduct } from '../../types/basket';

const BasketSummary = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const initialValue = 0;
  const seperator = ',';
  const isOrderPosted = useAppSelector(getOrderPostedStatus);
  const basketProducts = useAppSelector(getBasketProducts);
  const discountPercent = useAppSelector(getDiscountPercent);
  const validCoupon = useAppSelector(getCoupon);

  const priceAllBasketProducts = basketProducts.reduce(
    (accumulator, currentValue: BasketProduct) => accumulator + currentValue.productCard.price * currentValue.countProductCards,
    initialValue
  );

  const basketProductsIds = basketProducts.map(
    (item: BasketProduct) => Array(item.countProductCards as unknown as number[]).fill(item.productCard.id as unknown as number[])).join().split(seperator).map((item) => Number(item));

  const discount = Math.round(discountPercent ? priceAllBasketProducts * discountPercent / 100 : 0);

  const finalPrice = priceAllBasketProducts - discount;

  const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(sendOrder({
      camerasIds: basketProductsIds,
      coupon: validCoupon ? validCoupon : null
    }));
  };

  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{priceAllBasketProducts} ₽</span></p>
      <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className={`basket__summary-value ${validCoupon ? 'basket__summary-value--bonus' : ''}`}>{discount} ₽</span></p>
      <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{finalPrice} ₽</span></p>
      <button
        className="btn btn--purple"
        type='button'
        onClick={handleButtonClick}
        disabled={isOrderPosted || !basketProducts.length}
      >
        Оформить заказ
      </button>
    </div>
  );
};

export default BasketSummary;
