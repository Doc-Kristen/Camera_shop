import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductDetailed from '../../components/product-detailed/product-detailed';
import ProductSimilar from '../../components/product-similar/product-similar';
import ReviewBlock from '../../components/review-block/review-block';

const product = {
  id: 1,
  name: 'Sed ut perspiciatis',
  vendorCode: 'DA4IU67AD5',
  type: 'Lorem ipsum',
  category: 'Видеокамера',
  description: 'Quia consequuntur magni dolores eos qui ratione',
  level: 'Любительский',
  rating: 3,
  price: 3333,
  previewImg: 'img/content/das-auge.jpg',
  previewImg2x: 'img/content/das-auge@2x.jpg',
  previewImgWebp: 'img/content/das-auge.webp',
  previewImgWebp2x: 'img/content/das-auge@2x.webp',
  reviewCount: 16,
};

const ItemScreen = (): JSX.Element => (
  <div className="wrapper">
    <Header />
    <main>
      <div className="page-content">
        <Breadcrumbs />
        <div className="page-content__section">
          <ProductDetailed
            productDetailed={product}
          />
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
