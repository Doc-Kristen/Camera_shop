import { Product } from '../../types/product';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProducts, getProductsErrorStatus } from '../../store/product-data/selectors';
import ProductCard from '../product-card/product-card';
import usePagination from '../../hooks/usePagination';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoute, COUNT_CARDS_PER_PAGE } from '../../helpers/const';
import { redirectToRoute } from '../../store/action';

const CardsList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { pageNumber } = useParams();

  const allProducts = useAppSelector(getProducts);
  const isProductError = useAppSelector(getProductsErrorStatus);

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
    count: allProducts.length,
  });

  const products = allProducts.slice(firstContentIndex, lastContentIndex);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if(isProductError) {
        return;
      }
      if (Number(pageNumber) >= 1 && Number(pageNumber) <= totalPages) {
        window.history.replaceState(null, '', `/catalog/pages/${page}`);
        window.scrollTo(0, 0);
        return;
      }
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
    return () => {
      isMounted = false;
    };
  }, [page, pageNumber, firstContentIndex, lastContentIndex, products, totalPages, dispatch, isProductError]);

  if (isProductError) {
    return <p>Сервер с данными о товарах недоступен. Воспользуйтесь другими разделами сайта, либо зайдите позже.</p>;
  }

  return (
    <>
      <div className="cards catalog__cards">
        {products
          .map((productCard: Product) => (
            <ProductCard
              key={productCard.id}
              productCard={productCard}
              pageNumber={page}
            />
          ))}
      </div>
      <div className="pagination">
        <ul className="pagination__list">
          {firstContentIndex > page ?
            <li className="pagination__item">
              <Link onClick={prevPage} className="pagination__link pagination__link--text" to={`/catalog/pages/${page}`}>Назад</Link>
            </li> : null}
          {[...Array(totalPages).keys()].map((el) => (
            <li className="pagination__item"
              onClick={() => setPage(el + 1)}
              key={el}
            >
              <Link className={`pagination__link ${page === el + 1 ? 'pagination__link--active' : ''}`} to={`/catalog/pages/${page}`}>{el + 1}</Link>
            </li>
          ))}
          {page !== totalPages ?
            <li className="pagination__item">
              <Link onClick={nextPage} className="pagination__link pagination__link--text" to={`/catalog/pages/${page}`}>Далее</Link>
            </li> : null}
        </ul>
      </div>
    </>
  );
};

export default CardsList;
