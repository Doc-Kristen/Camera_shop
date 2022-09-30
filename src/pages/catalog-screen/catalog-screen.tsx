import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-card/product-card';
import { Promo } from '../../mock/mock';
import { Product, Products } from '../../types/product';

type CatalogScreenProps = {
  productCards: Products;
}

const CatalogScreen = ({ productCards }: CatalogScreenProps): JSX.Element => (
  <div className="wrapper">
    <Header />
    <main>
      <Banner
        promo={Promo}
      />
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
                <CatalogSort />
                <div className="cards catalog__cards">
                  {
                    productCards.map((productCard: Product) => (
                      <ProductCard
                        key={productCard.id}
                        productCard={productCard}
                      />
                    ))
                  }
                </div>
                <Pagination />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default CatalogScreen;
