import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductDetailed from '../../components/product-detailed/product-detailed';
import ProductSimilar from '../../components/product-similar/product-similar';
import ReviewBlock from '../../components/review-block/review-block';

const ItemScreen = (): JSX.Element => (
  <div className="wrapper">
    <Header />
    <main>
      <div className="page-content">
        <Breadcrumbs />
        <div className="page-content__section">
          <ProductDetailed />
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

export default ItemScreen;
