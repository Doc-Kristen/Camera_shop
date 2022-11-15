import { Pagination } from '../../helpers/const';
import { useAppSelector } from '../../hooks';
import usePagination from '../../hooks/use-pagination';
import { getSimilarProductErrorStatus } from '../../store/product-data/selectors';
import { Product, Products } from '../../types/product';
import ProductCard from '../product-card/product-card';

type ProductsSimilarProps = {
  productsSimilar: Products;
};

const ProductsSimilar = ({productsSimilar} : ProductsSimilarProps): JSX.Element => {

  const productsSimilarIsError = useAppSelector(getSimilarProductErrorStatus);

  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    totalPages,
    prevPage,
    page
  } = usePagination({
    contentPerPage: Pagination.CountSimilarCards,
    count: productsSimilar.length,
  });

  if (productsSimilarIsError) {
    return (
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <p>Ошибка при загрузке информации о похожих товарах. Пожалуйста, попробуйте позже</p>
        </div>
      </section>
    );

  }

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {productsSimilar.slice(firstContentIndex, lastContentIndex)
                .map((item : Product) =>
                  (
                    <ProductCard
                      key={item.id}
                      isActive
                      productCard={item}
                    />
                  )
                )}

            </div>
            {firstContentIndex > page ?
              <button
                onClick={prevPage}
                className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд"
              >
                <svg width="7" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
              : null}
            {page !== totalPages ?
              <button
                onClick={nextPage}
                className="slider-controls slider-controls--next"
                type="button" aria-label="Следующий слайд"
              >
                <svg width="7" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
              : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsSimilar;
