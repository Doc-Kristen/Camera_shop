import { ChangeEvent, useState } from 'react';
// import { useAppDispatch } from '../../hooks';
// import { sendCoupon } from '../../store/api-actions';

const BasketPromo = (): JSX.Element => {

  const [formData, setformData] = useState('');

  const onChangeInput = (evt :ChangeEvent<HTMLInputElement>) => {
    setformData(String(evt.target.value));
  };

  // const sendUserCoupon = (evt) => {
  //   dispatch(sendCoupon({ coupon: formData }));
  // };

  return (
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form
          action="#"
        >
          <div className="custom-input">
            <label><span className="custom-input__label">Промокод</span>
              <input
                type="text"
                name="promo"
                placeholder="Введите промокод"
                // ref={inputPromoRef}
                value={String(formData)}
                onChange={onChangeInput}
              />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button
            // onClick={sendUserCoupon}
            className="btn" type="submit"
          >Применить
          </button>
        </form>
      </div>
    </div>
  );
};

export default BasketPromo;
