import BasketProductCard from '../../components/basket-product-card/basket-product-card';
import BasketPromo from '../../components/basket-promo/basket-promo';
import BasketRemoveProductModal from '../../components/basket-remove-product-modal/basket-remove-product-modal';
import BasketSummary from '../../components/basket-summary/basket-summary';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getBasketModalRemoveOpenedStatus, getBasketProducts } from '../../store/basket-process/selectors';
import { BasketProduct } from '../../types/basket';

const BasketScreen = (): JSX.Element => {

  const isModalOpened = useAppSelector(getBasketModalRemoveOpenedStatus);
  let counter = 1;

  const basketProductsList = useAppSelector(getBasketProducts).slice();

  return (
    <>
      <div className="wrapper">
        <Header />
        <main>
          <div className="page-content">
            <Breadcrumbs />
            <section className="basket">
              <div className="container">
                <h1 className="title title--h2">Корзина</h1>
                <ul className="basket__list">
                  {
                    basketProductsList.map((product : BasketProduct) =>
                      (
                        <BasketProductCard
                          key={`basket-${product.productCard.id}-${counter++}`}
                          productCard={product}
                        />)
                    )
                  }
                </ul>
                <div className="basket__summary">
                  <BasketPromo />
                  <BasketSummary />
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
      {isModalOpened && <BasketRemoveProductModal/>}
    </>
  );
};

export default BasketScreen;
