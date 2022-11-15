import { OrderType, SortingType } from '../../helpers/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOrderSortingType, setSortingType } from '../../store/action';
import { getOrderType, getSortingType } from '../../store/sorting-process/selectors';

const CatalogSort = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const selectedSorting = useAppSelector(getSortingType);
  const selectedOrder = useAppSelector(getOrderType);

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                onChange={
                  () => {
                    dispatch(setSortingType(SortingType.Price));
                  }
                }
                checked={selectedSorting === SortingType.Price}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={selectedSorting === SortingType.Rating}
                onChange={

                  () => {
                    dispatch(setSortingType(SortingType.Rating));
                  }
                }
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                checked={selectedOrder === OrderType.Asc}
                onChange={
                  () => {
                    dispatch(setOrderSortingType(OrderType.Asc));
                  }
                }
                aria-label="По возрастанию"
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={selectedOrder === OrderType.Desc}
                onChange={
                  () => {
                    dispatch(setOrderSortingType(OrderType.Desc));
                  }
                }
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CatalogSort;
