import { Link } from 'react-router-dom';
import { AppRoute } from '../../helpers/const';
import { useAppSelector } from '../../hooks';
import { getBasketProducts } from '../../store/basket-process/selectors';
import FormSearch from '../form-search/form-search';
import Logo from '../logo/logo';

const Header = (): JSX.Element => {
  const basketProducts = useAppSelector(getBasketProducts);
  return(
    <header className="header" id="header">
      <div className="container">
        <Logo />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to={AppRoute.Main}>Каталог</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Гарантии</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Доставка</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <FormSearch />
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg> {
            basketProducts.length ?
              <span className="header__basket-count">{basketProducts.length}</span> :
              null
          }
        </Link>
      </div>
    </header>
  );
};

export default Header;
