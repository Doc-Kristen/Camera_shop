import { useEffect, useMemo } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import BasketModal from '../../components/basket-modal/basket-modal';
import BasketSuccessModal from '../../components/basket-success-modal/basket-success-modal';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CardsList from '../../components/cards-list/cards-list';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Pagination from '../../components/pagination/pagination';
import { DEFAULT_PAGE, DEFAULT_PRODUCTS_COUNT_PER_PAGE, QueryParameterType } from '../../helpers/const';
import { disableBackgroundScrolling } from '../../helpers/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentCatalogPath } from '../../store/action';
import { fetchProductsAction, fetchProductsByPriceAction } from '../../store/api-actions';
import { getBasketModalOpenedStatus, getBasketSuccessStatus, getCurrentCatalogProduct } from '../../store/basket-process/selectors';
import { getDataLoadedStatus, getPagesCount, getProducts } from '../../store/product-data/selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';

const CatalogScreen = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const { pageNumber = 1 } = useParams();
  const [searchParams] = useSearchParams();

  const products = useAppSelector(getProducts);
  const currentCatalogProduct = useAppSelector(getCurrentCatalogProduct);
  const isProductsLoaded = useAppSelector(getDataLoadedStatus);
  const isBasketSuccess = useAppSelector(getBasketSuccessStatus);
  const isBasketModalOpened = useAppSelector(getBasketModalOpenedStatus);
  const currentPage = Number(pageNumber);
  const totalProductsCount = useAppSelector(getPagesCount);

  const pagesCount = useMemo(() => (
    Math.ceil(totalProductsCount / DEFAULT_PRODUCTS_COUNT_PER_PAGE)
  ), [totalProductsCount]);

  const sortParams = useMemo(() => ({
    sortType: searchParams.get(QueryParameterType.Sort),
    orderType: searchParams.get(QueryParameterType.Order),
    categoryType: searchParams.getAll(QueryParameterType.Category),
    productType: searchParams.getAll(QueryParameterType.Type),
    levelType: searchParams.getAll(QueryParameterType.Level),
    priceMinimum: searchParams.get(QueryParameterType.PriceMinimum),
    priceMaximum: searchParams.get(QueryParameterType.PriceMaximum),
  }), [searchParams]);

  disableBackgroundScrolling(isBasketSuccess || isBasketModalOpened);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = () => {
        if (currentPage) {
          dispatch(setCurrentCatalogPath({
            currentPage: currentPage <= pagesCount ? currentPage : DEFAULT_PAGE,
            search: decodeURI(searchParams.toString())
          }));
          dispatch(fetchProductsAction({
            currentPage: currentPage <= pagesCount ? currentPage : DEFAULT_PAGE,
            params: {
              ...sortParams,
            },
          }));
          dispatch(fetchProductsByPriceAction({
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
  }, [currentPage, dispatch, location.pathname, pagesCount, searchParams, sortParams]);

  if (currentPage === 0 || isNaN(currentPage)) {
    return <NotFoundScreen />;
  }

  if ((currentPage > pagesCount || currentPage < DEFAULT_PAGE) && pagesCount !== 0) {
    return <NotFoundScreen />;
  }

  return (
    <>
      <div className="wrapper">
        <Header />
        <main>
          <Banner />
          <div className="page-content" id='page-content'>
            <Breadcrumbs />
            <section
              className="catalog"
              id='catalog'
            >
              <div className="container">
                <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
                <div className="page-content__columns">
                  <div className="catalog__aside">
                    <CatalogFilter />
                  </div>
                  <div className="catalog__content">
                    <CatalogSort />
                    {
                      isProductsLoaded ? <p>Загрузка данных...</p> :
                        <>
                          <CardsList
                            products={products}
                          />
                          {
                            products.length > 0 ?
                              <Pagination
                                pagesCount={pagesCount}
                              />
                              : null
                          }

                        </>
                    }
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
      {isBasketSuccess && <BasketSuccessModal />}
      {isBasketModalOpened && currentCatalogProduct && <BasketModal productCard={currentCatalogProduct} />}
    </>
  );
};

export default CatalogScreen;
