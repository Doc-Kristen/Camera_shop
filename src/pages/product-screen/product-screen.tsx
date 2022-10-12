import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductDetailed from '../../components/product-detailed/product-detailed';
import ProductSimilar from '../../components/product-similar/product-similar';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSelectedProduct, getSimilarProducts } from '../../store/product-data/selectors';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchSelectedProductAction, fetchSimilarProductsAction } from '../../store/api-actions';
const reviewProps = [
  {
    id: '2ab4a018-2e53-4f7c-abc7-7f868093e9a5',
    userName: 'Кирилл',
    advantage: 'Легкая в плане веса, удобная в интерфейсе',
    disadvantage: 'Быстро садиться зарядка',
    review: 'Это моя первая камера. Я в восторге, нареканий нет',
    rating: 4,
    createAt: '2022-07-09T13:24:57.980Z',
    cameraId: 1
  },
  {
    id: '2ab4a018-2e53-4kf7c-abc7-7f868093e9a5',
    userName: 'Кирилл',
    advantage: 'Легкая в плане веса, удобная в интерфейсе',
    disadvantage: 'Быстро садиться зарядка',
    review: 'Это моя первая камера. Я в восторге, нареканий нет',
    rating: 4,
    createAt: '2022-07-09T13:24:57.980Z',
    cameraId: 1
  }
];

const ProductScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const ProductId = Number(id);
  const productDetailed = useAppSelector(getSelectedProduct);
  const productsSimilar = useAppSelector(getSimilarProducts);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = () => {
        dispatch(fetchSelectedProductAction(ProductId));
        dispatch(fetchSimilarProductsAction(ProductId));
        window.scroll(0, 0);
      };
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [ProductId, dispatch]);

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
          {
            productsSimilar ?
              <div className="page-content__section">
                <ProductSimilar />
              </div>
              :
              null
          }
          <div className="page-content__section">
            <ReviewsList
              reviews={reviewProps}
            />
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

export default ProductScreen;
