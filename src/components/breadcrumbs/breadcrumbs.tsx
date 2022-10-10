import { Link, useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getSelectedProduct } from '../../store/product-data/selectors';

const Breadcrumbs = (): JSX.Element => {
  const location = useLocation();

  const { id, pageNumber } = useParams();

  const product = useAppSelector(getSelectedProduct);

  const routes = [
    {
      path: '',
      breadcrumbName: 'Главная',
    },
    {
      path: `catalog/${pageNumber ? pageNumber : ''}`,
      breadcrumbName: 'Каталог',
    },
    {
      path: `catalog/${pageNumber ? pageNumber : ''}/${id ? id : ''}`,
      breadcrumbName: product?.name,
    },
  ];

  const userLocation = location.pathname
    .replace(/\/$/, '')
    .split('/')
    .reduce((previous: string, current: string) => `${previous}/${current}`);

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {
            routes.map(
              (item) =>
                userLocation.includes(item.path) ?
                  <li key={item.path}
                    className="breadcrumbs__item"
                  >
                    <Link className={`breadcrumbs__link${`/${item.path}` === userLocation ? '--active' : ''}`}
                      to={`/${item.path}`}
                    >
                      {item.breadcrumbName}
                      {
                        `/${item.path}` === userLocation
                          ? null
                          :
                          <svg width="5" height="8" aria-hidden="true">
                            <use xlinkHref="#icon-arrow-mini"></use>
                          </svg>
                      }
                    </Link>
                  </li>
                  : null
            )
          }
        </ul>
      </div>
    </div>
  );
};
export default Breadcrumbs;
