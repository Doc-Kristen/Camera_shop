import { useEffect } from 'react';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CardsList from '../../components/cards-list/cards-list';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductsAction } from '../../store/api-actions';
import { getDataLoadedStatus } from '../../store/product-data/selectors';
import { getOrderType, getSortingType } from '../../store/sorting-process/selectors';

const CatalogScreen = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const isProductsLoaded = useAppSelector(getDataLoadedStatus);
  const selectedSorting = useAppSelector(getSortingType);
  const selectedOrder = useAppSelector(getOrderType);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = () => {
        dispatch(fetchProductsAction({ sortType: selectedSorting, orderType: selectedOrder }));
      };
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, selectedOrder, selectedSorting]);

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
                      <><CatalogSort /><CardsList /></>
                  }
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
