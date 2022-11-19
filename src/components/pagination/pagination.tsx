import { useAppSelector } from '../../hooks';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, DEFAULT_STEP_PAGINATION } from '../../helpers/const';
import { getCurrentCatalogPath } from '../../store/path-process/selectors';

type PaginationProps = {
  pagesCount: number;
}

const Pagination = ({ pagesCount }: PaginationProps): JSX.Element => {
  const { currentPage, search } = useAppSelector(getCurrentCatalogPath);

  return (

    <div className="pagination">
      <ul className="pagination__list">
        {currentPage !== DEFAULT_PAGE &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={{
                pathname: generatePath(AppRoute.Products, { pageNumber: String(currentPage - DEFAULT_STEP_PAGINATION) }),
                search
              }}
            >Назад
            </Link>
          </li>}
        {[...Array(pagesCount).keys()].map((page) => (
          <li className="pagination__item"
            key={page}
          >
            <Link className={`pagination__link ${currentPage === page + 1 ? 'pagination__link--active' : ''}`}
              to={{
                pathname: generatePath(AppRoute.Products, { pageNumber: String(page + 1) }),
                search
              }}
            >{page + 1}
            </Link>
          </li>
        ))}

        {currentPage !== pagesCount ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={{
                pathname: generatePath(AppRoute.Products, { pageNumber: String(currentPage + DEFAULT_STEP_PAGINATION) }),
                search
              }}
            >Далее
            </Link>
          </li> : null}
      </ul>
    </div>
  );
};

export default Pagination;
