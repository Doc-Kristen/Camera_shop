import { Link } from 'react-router-dom';
import { AppRoute } from '../../helpers/const';

const NotFoundScreen = (): JSX.Element => (
  <main>
    <h1>404 Not Found</h1>
    <p><Link to={AppRoute.Main}>Перейти на главную страницу</Link></p>
  </main>
);

export default NotFoundScreen;
