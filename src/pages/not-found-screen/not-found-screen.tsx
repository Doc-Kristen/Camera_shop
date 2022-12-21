import '../not-found-screen/not-found-screen.css';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../helpers/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOrderErrorStatus } from '../../store/action';
import { getErrorOrderStatus } from '../../store/basket-process/selectors';

const NotFoundScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isOrderError = useAppSelector(getErrorOrderStatus);
  if (isOrderError) {
    return (
      <main>
        <div
          data-testid="error-order"
          className='error-container'
        >
          <h1>Что-то пошло не так...</h1>
          <p>Попробуйте отправить заказа снова, либо зайдите позже.</p>
          <Link
            className='btn'
            to={AppRoute.Basket}
            onClick={() => {
              dispatch(setOrderErrorStatus(false));
            }}
          >Вернуться в корзину
          </Link>
        </div>

      </main>);
  }
  return (
    <main>
      <div
        className='error-container'
        data-testid="page-not-found"
      >
        <h1>404 Not Found</h1>
        <Link className='btn' to={AppRoute.Main}>Перейти на главную страницу</Link>
      </div>
    </main >
  );
};

export default NotFoundScreen;
