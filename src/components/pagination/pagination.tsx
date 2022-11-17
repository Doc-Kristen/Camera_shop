import { useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { getCurrentCatalogPath } from '../../store/path-process/selectors';
import { DEFAULT_PAGE, DEFAULT_STEP_PAGINATION } from '../../helpers/const';

type PaginationProps = {
  pagesCount: number;
}

const Pagination = ({ pagesCount }: PaginationProps): JSX.Element => {
  const { currentPage } = useAppSelector(getCurrentCatalogPath);

  return (

    <div className="pagination">
      <ul className="pagination__list">
        {currentPage !== DEFAULT_PAGE &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={
                `/catalog/page_${currentPage - DEFAULT_STEP_PAGINATION}`
              }
            >Назад
            </Link>
          </li>}
        {[...Array(pagesCount).keys()].map((page) => (
          <li className="pagination__item"
            key={page}
          >
            <Link className={`pagination__link ${currentPage === page + 1 ? 'pagination__link--active' : ''}`}
              to={`/catalog/page_${page + 1}`}
            >{page + 1}
            </Link>
          </li>
        ))}

        {currentPage !== pagesCount ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={
                `/catalog/page_${currentPage + DEFAULT_STEP_PAGINATION}`
              }
            >Далее
            </Link>
          </li> : null}
      </ul>
    </div>
  );
};

export default Pagination;
