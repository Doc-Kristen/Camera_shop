import { Link } from 'react-router-dom';
import { AppRoute } from '../../helpers/const';

const Logo = (): JSX.Element => (
  <Link className="header__logo" to={AppRoute.Main} aria-label="Переход на главную">
    <svg width="100" height="36" aria-hidden="true">
      <use xlinkHref="#icon-logo"></use>
    </svg>
  </Link>
);

export default Logo;
