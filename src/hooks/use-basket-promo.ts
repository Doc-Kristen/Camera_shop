import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '.';
import { couponRegExp } from '../helpers/const';
import { setCoupon, setStatusCoupon } from '../store/action';
import { sendCoupon } from '../store/api-actions';
import { Coupon } from '../types/order';

type ResultUseBasketPromo = [
  Coupon,
  (evt: React.ChangeEvent<HTMLInputElement>) => void,
  (evt: React.MouseEvent<HTMLButtonElement>) => void,
];

export const useBasketPromo = (formContentDefault: Coupon): ResultUseBasketPromo => {

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState(formContentDefault);


  const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setFormData(formData);
    if (formData.coupon !== '') {
      dispatch(sendCoupon({ coupon: formData.coupon }));
    }
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setStatusCoupon(undefined));
    dispatch(setCoupon(''));
    setFormData({ ...formData, coupon: (target.value).replace(couponRegExp, '') });

  };

  return [
    formData,
    handleInputChange,
    handleButtonClick,
  ];
};
