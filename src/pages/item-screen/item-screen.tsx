import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductDetailed from '../../components/product-detailed/product-detailed';
import ProductSimilar from '../../components/product-similar/product-similar';
import ReviewBlock from '../../components/review-block/review-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSelectedProduct } from '../../store/product-data/selectors';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchSelectedProductAction } from '../../store/api-actions';

const ItemScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const ProductId = Number(id);
  const productDetailed = useAppSelector(getSelectedProduct);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = () => {
        dispatch(fetchSelectedProductAction(ProductId));
      };
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, ProductId]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs />
          <div className="page-content__section">
            {
              productDetailed
                ?
                <ProductDetailed
                  productDetailed={productDetailed}
                />
                : <p>Loading...</p>
            }
          </div>
          <div className="page-content__section">
            <ProductSimilar />
          </div>
          <div className="page-content__section">
            <ReviewBlock />
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <Footer />
    </div>
  );
};

export default ItemScreen;
