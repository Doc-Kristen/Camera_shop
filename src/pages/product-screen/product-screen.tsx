import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductDetailed from '../../components/product-detailed/product-detailed';
import ProductsSimilar from '../../components/products-similar/products-similar';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getDataLoadedStatus, getSelectedProduct, getSelectedProductErrorStatus, getSimilarProductErrorStatus, getSimilarProducts } from '../../store/product-data/selectors';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchSelectedProductAction } from '../../store/api-actions';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Loading from '../../components/loading/loading';
import { getReviews, getReviewsErrorStatus } from '../../store/review-data/selectors';
import { getReviewSuccessStatus } from '../../store/user-process/selectors';
import { AppRoute } from '../../helpers/const';
import { redirectToRoute, setSelectedProductErrorStatus } from '../../store/action';

const ProductScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const ProductId = Number(id);
  const productDetailed = useAppSelector(getSelectedProduct);
  const similarProducts = useAppSelector(getSimilarProducts);
  const productIsError = useAppSelector(getSelectedProductErrorStatus);
  const productIsLoaded = useAppSelector(getDataLoadedStatus);
  const isReviewError = useAppSelector(getReviewsErrorStatus);
  const allReviews = useAppSelector(getReviews);
  const productsSimilarIsError = useAppSelector(getSimilarProductErrorStatus);
  const isReviewSuccess = useAppSelector(getReviewSuccessStatus);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = () => {
        dispatch(fetchSelectedProductAction(ProductId));
        window.scroll(0, 0);
      };
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [ProductId, dispatch, isReviewSuccess]);

  if (productIsLoaded) {
    return (<Loading />);
  }

  if (productIsError) {
    dispatch(setSelectedProductErrorStatus(true));
    dispatch(redirectToRoute(AppRoute.NotFound));
    return (<NotFoundScreen />);
  }

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
                : null
            }
          </div>
          {
            !productsSimilarIsError && similarProducts.length === 0 ?
              null
              :
              <ProductsSimilar
                productsSimilar={similarProducts}
              />
          }
          <div className="page-content__section">
            {
              <ReviewsList
                noReviews={!isReviewError && allReviews.length === 0 }
              />
            }
          </div>
        </div>
      </main>
      <button
        className="up-btn" type="button"
        onClick={
          () => { window.scrollTo({ top: 0, behavior: 'smooth' }); }
        }
      >
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </button>
      <Footer />
    </div>
  );
};

export default ProductScreen;
