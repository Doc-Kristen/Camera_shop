import { useEffect, useState } from 'react';
import { couponDefaultValue } from '../../helpers/const';
import { useAppSelector } from '../../hooks';
import { useBasketPromo } from '../../hooks/use-basket-promo';
import { getCoupon, getCouponPostedStatus, getCouponValidStatus, getOrderPostedStatus } from '../../store/basket-process/selectors';

const BasketPromo = (): JSX.Element => {

  const isCouponValid = useAppSelector(getCouponValidStatus);
  const isCouponPosted = useAppSelector(getCouponPostedStatus);
  const isOrderPosted = useAppSelector(getOrderPostedStatus);
  const coupon = useAppSelector(getCoupon);

  const formConteDefault = coupon && isCouponValid ? coupon : couponDefaultValue;

  const [
    formData,
    handleInputChange,
    handleButtonClick,
  ] = useBasketPromo({
    coupon: formConteDefault
  });

  const [couponClassName, setCouponClassName] = useState('custom-input');

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (isCouponValid === true) {
        setCouponClassName('custom-input is-valid');
      }
      if (isCouponValid === false) {
        setCouponClassName('custom-input is-invalid');
      }
      if (isCouponValid === undefined) {
        setCouponClassName('custom-input');
      }
    }
    return () => {
      isMounted = false;
    };
  }, [isCouponValid]);

  return (
    <div
      className="basket__promo"
    >
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form
          action="#"
        >
          <div className={`${couponClassName}`}>
            <label><span className="custom-input__label">Промокод</span>
              <input
                type="text"
                name="promo"
                placeholder="Введите промокод"
                value={String(formData.coupon)}
                onChange={handleInputChange}
                disabled={isCouponPosted || isOrderPosted}
              />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button
            type='button'
            onClick={handleButtonClick}
            className="btn"
            disabled={isCouponPosted || isOrderPosted}
          >Применить
          </button>
        </form>
      </div>
    </div>
  );
};

export default BasketPromo;
