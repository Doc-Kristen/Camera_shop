import { generatePath, Link, useLocation, useParams } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE } from '../../helpers/const';
import { useAppSelector } from '../../hooks';
import { getCurrentCatalogPath } from '../../store/path-process/selectors';

type BreadcrumbsProps = {
  productName?: string;
}

const Breadcrumbs = ({ productName }: BreadcrumbsProps): JSX.Element => {
  const location = useLocation();
  const { id, pageNumber } = useParams();

  const { currentPage, search } = useAppSelector(getCurrentCatalogPath);

  const selectedDetails = location.pathname
    .replace(/\/$/, '')
    .split('/');

  const selectDetails = () => {
    if (selectedDetails.includes('description')) {
      return 'description';
    }
    if (selectedDetails.includes('specification')) {
      return 'specification';
    }
    return '*';
  };

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className={`breadcrumbs__link${location.pathname === '' ? '--active' : ''}`} to={AppRoute.Main}>Главная
              {
                location.pathname === '' ? null :
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
              }

            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className={`breadcrumbs__link${pageNumber ? '--active' : ''}`}
              to={{
                pathname: generatePath(AppRoute.Products, { pageNumber: String(currentPage ? currentPage : DEFAULT_PAGE) }),
                search
              }}
            >Каталог
              {pageNumber ? null :
                <svg width="5" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini"></use>
                </svg>}
            </Link>
          </li>
          {
            productName ?
              <li className="breadcrumbs__item">
                <Link className={`breadcrumbs__link${id ? '--active' : ''}`}
                  to={`/catalog/${id ? id : ''}/${selectDetails()}`}
                >
                  {productName}
                  {id ? null :
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>}
                </Link>
              </li>
              : null
          }

        </ul>
      </div>
    </div>
  );
};
export default Breadcrumbs;
