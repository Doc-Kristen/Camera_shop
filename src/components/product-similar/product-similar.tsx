import { useAppSelector } from '../../hooks';
import usePagination from '../../hooks/usePagination';
import { getSimilarProducts } from '../../store/product-data/selectors';
import ProductCard from '../product-card/product-card';

const ProductSimilar = (): JSX.Element => {

  const productsSimilar = useAppSelector(getSimilarProducts);

  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    totalPages,
    prevPage,
    page
  } = usePagination({
    contentPerPage: 3,
    count: productsSimilar.length,
  });

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {productsSimilar.slice(firstContentIndex, lastContentIndex)
              .map((item) =>
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
  );
};

export default ProductSimilar;
