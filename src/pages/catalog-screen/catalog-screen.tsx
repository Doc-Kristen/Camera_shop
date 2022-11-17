import { useEffect, useMemo } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CardsList from '../../components/cards-list/cards-list';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Pagination from '../../components/pagination/pagination';
import { DEFAULT_PRODUCTS_COUNT_PER_PAGE, QueryParameterType } from '../../helpers/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductsAction } from '../../store/api-actions';
import { setCurrentCatalogPath } from '../../store/path-process/path-process';
import { getDataLoadedStatus, getPagesCount, getProducts } from '../../store/product-data/selectors';

const CatalogScreen = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const { pageNumber = 1 } = useParams();
  const [searchParams] = useSearchParams();

  const products = useAppSelector(getProducts);
  const isProductsLoaded = useAppSelector(getDataLoadedStatus);
  const currentPage = Number(pageNumber);
  const totalPagesCount = useAppSelector(getPagesCount);

  const pagesCount = useMemo(() => (
    Math.ceil(totalPagesCount / DEFAULT_PRODUCTS_COUNT_PER_PAGE)
  ), [totalPagesCount]);


  const sortParams = useMemo(() => ({
    sortType: searchParams.get(QueryParameterType.Sort),
    orderType: searchParams.get(QueryParameterType.Order),
  }), [searchParams]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = () => {
        if (currentPage) {
          dispatch(setCurrentCatalogPath({
            currentPage,
            search: decodeURI(searchParams.toString())
          }));
          dispatch(fetchProductsAction({
            currentPage,
            params: {
              ...sortParams,
            },
          }));
        }
      };
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [currentPage, dispatch, location.pathname, searchParams, sortParams]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogFilter />
                </div>
                <div className="catalog__content">
                  {
                    isProductsLoaded ? <p>Загрузка данных...</p> :
                      <>
                        <CatalogSort />
                        <CardsList
                          products={products}
                        />
                      </>
                  }
                  <Pagination
                    pagesCount={pagesCount}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogScreen;
