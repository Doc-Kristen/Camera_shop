import { Product } from '../../types/product';
import { useAppSelector } from '../../hooks';
import { getProductErrorStatus, getProducts } from '../../store/product-data/selectors';
import ProductCard from '../product-card/product-card';
import usePagination from '../../hooks/usePagination';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { COUNT_CARDS_PER_PAGE } from '../../helpers/const';

const CardList = (): JSX.Element => {
  const products = useAppSelector(getProducts);
  const isProductError = useAppSelector(getProductErrorStatus);
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: COUNT_CARDS_PER_PAGE,
    count: products.length,
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      window.history.replaceState(null, '', `/catalog/page_${page}`);
      window.scrollTo(0, 0);
    }
    return () => {
      isMounted = false;
    };
  }, [page]);

  if (isProductError) {
    return <p>Сервер с данными о товарах недоступен. Воспользуйтесь другими разделами сайта, либо зайдите позже.</p>;
  }

  return (
    <>
      <div className="cards catalog__cards">
        {products.slice(firstContentIndex, lastContentIndex)
          .map((productCard: Product) => (
            <ProductCard
              key={productCard.id}
              productCard={productCard}
            />
          ))}
      </div>
      <div className="pagination">
        <ul className="pagination__list">
          {firstContentIndex > page ?
            <li className="pagination__item">
              <Link onClick={prevPage} className="pagination__link pagination__link--text" to={`/catalog/page_${page}`}>Назад</Link>
            </li> : null}
          {[...Array(totalPages).keys()].map((el) => (
            <li className="pagination__item"
              onClick={() => setPage(el + 1)}
              key={el}
            >
              <Link className={`pagination__link ${page === el + 1 ? 'pagination__link--active' : ''}`} to={`/catalog/page_${page}`}>{el + 1}</Link>
            </li>
          ))}
          {page !== totalPages ?
            <li className="pagination__item">
              <Link onClick={nextPage} className="pagination__link pagination__link--text" to={`/catalog/page_${page}`}>Далее</Link>
            </li> : null}
        </ul>
      </div>
    </>
  );
};

export default CardList;
