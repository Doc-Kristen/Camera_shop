import { Link, useLocation, useParams } from 'react-router-dom';
import { DEFAULT_PAGE } from '../../helpers/const';

type BreadcrumbsProps = {
  productName?: string;
}

const Breadcrumbs = ({ productName }: BreadcrumbsProps): JSX.Element => {
  const location = useLocation();

  const { id, pageNumber } = useParams();

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
            <Link className={`breadcrumbs__link${location.pathname === '' ? '--active' : ''}`} to="/">Главная
              {
                location.pathname === '' ? null :
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
              }

            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className={`breadcrumbs__link${pageNumber ? '--active' : ''}`} to={`/catalog/page_${pageNumber ? pageNumber : DEFAULT_PAGE}`}>Каталог
              {pageNumber ? null :
                <svg width="5" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini"></use>
                </svg>}
            </Link>
          </li>
          {
            productName ?
              <li className="breadcrumbs__item">
                <Link className={`breadcrumbs__link${id ? '--active' : ''}`} to={`/catalog/${id ? id : ''}/${selectDetails()}`}>{productName}
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
