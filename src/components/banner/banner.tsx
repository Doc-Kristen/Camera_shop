import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPromoAction } from '../../store/api-actions';
import { getPromo, getPromoErrorStatus } from '../../store/product-data/selectors';

const Banner = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const promo = useAppSelector(getPromo);
  const isPromoError = useAppSelector(getPromoErrorStatus);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = () => {
        dispatch(fetchPromoAction());
      };
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (isPromoError) {
    return (
      <div className="banner">
        <p>Данные для баннера не загружены. Попробуйте перезагрузить страницу или зайти позже</p>
      </div>);
  }

  if (promo) {
    return (
      <div className="banner">
        <picture>
          <source type="image/webp" srcSet={`/${promo.previewImg}, /${promo.previewImgWebp}, /${promo.previewImgWebp2x} 2x`} />
          <img src={`/${promo?.previewImg}`} srcSet={`/${promo.previewImgWebp2x}`} width="1280" height="280" alt="баннер" />
        </picture>
        <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">{promo?.name}</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span><Link className="btn" to={`/cameras/${promo?.id}`}>Подробнее</Link></p>
      </div>
    );
  }
  return (
    <div className="banner">
      <p>Загрузка...</p>
    </div>);
};

export default Banner;
