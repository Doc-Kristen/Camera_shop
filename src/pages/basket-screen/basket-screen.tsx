import BasketProductCard from '../../components/basket-product-card/basket-product-card';
import BasketPromo from '../../components/basket-promo/basket-promo';
import BasketSuccessModal from '../../components/basket-remove-product-modal/basket-remove-product-modal';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getBasketModalRemoveOpenedStatus, getBasketProducts } from '../../store/basket-process/selectors';
import { Products } from '../../types/product';

const BasketScreen = (): JSX.Element => {
  const basketProducts = useAppSelector(getBasketProducts).slice();
  const isModalOpened = useAppSelector(getBasketModalRemoveOpenedStatus);
  let counter = 1;

  const getUniqueBasketProducts = (arr: Products, key: string) => {
    const set = new Set();
    return arr.filter((productId: { [x: string]: string | number }) => !set.has(productId[key]) && set.add(productId[key]));
  };

  const uniqueBasketProducts = getUniqueBasketProducts(basketProducts, 'id');

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
                    uniqueBasketProducts.map((product) =>
                      (
                        <BasketProductCard
                          key={`basket-${product.id}-${counter++}`}
                          productCard={product}
                        />)
                    )
                  }
                </ul>
                <div className="basket__summary">
                  <BasketPromo />
                  <div className="basket__summary-order">
                    <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">111 390 ₽</span></p>
                    <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
                    <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
                    <button className="btn btn--purple" type="submit">Оформить заказ
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
      {isModalOpened && <BasketSuccessModal />}
    </>
  );
};

export default BasketScreen;
