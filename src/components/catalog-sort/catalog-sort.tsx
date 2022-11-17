import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { OrderType, QueryParameterType, SortingType } from '../../helpers/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOrderSortingType, setSortingType } from '../../store/action';
import { getOrderType, getSortingType } from '../../store/sorting-process/selectors';

const CatalogSort = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSorting = useAppSelector(getSortingType);
  const selectedOrder = useAppSelector(getOrderType);

  useEffect(() => {
    if (searchParams.has(QueryParameterType.Sort) && !searchParams.has(QueryParameterType.Order)) {
      searchParams.set(QueryParameterType.Order, OrderType.Asc);
      setSearchParams(searchParams);
    }

    if (!searchParams.has(QueryParameterType.Sort) && searchParams.has(QueryParameterType.Order)) {
      searchParams.set(QueryParameterType.Sort, SortingType.Price);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

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
                onChange={() => {
                  if (selectedOrder === '') {
                    dispatch(setSortingType(SortingType.Price));
                    searchParams.set(QueryParameterType.Sort, SortingType.Price);
                    dispatch(setOrderSortingType(OrderType.Asc));
                    setSearchParams(searchParams);
                  }

                  dispatch(setSortingType(SortingType.Price));
                  setSearchParams(searchParams);
                }}
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
                onChange={() => {
                  if (selectedOrder === '') {
                    dispatch(setSortingType(SortingType.Rating));
                    searchParams.set(QueryParameterType.Sort, SortingType.Rating);
                    dispatch(setOrderSortingType(OrderType.Asc));
                    setSearchParams(searchParams);
                  }

                  dispatch(setSortingType(SortingType.Rating));
                  setSearchParams(searchParams);
                }}
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
                onChange={() => {
                  if (selectedSorting === '') {
                    dispatch(setSortingType(SortingType.Price));
                    dispatch(setOrderSortingType(OrderType.Asc));
                    searchParams.set(QueryParameterType.Order, OrderType.Asc);
                    setSearchParams(searchParams);
                  }

                  dispatch(setOrderSortingType(OrderType.Asc));
                  setSearchParams(searchParams);
                }}
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
                onChange={() => {
                  if (selectedSorting === '') {
                    dispatch(setSortingType(SortingType.Price));
                    dispatch(setOrderSortingType(OrderType.Desc));
                    searchParams.set(QueryParameterType.Order, OrderType.Desc);
                    setSearchParams(searchParams);
                  }

                  dispatch(setOrderSortingType(OrderType.Desc));
                  setSearchParams(searchParams);
                }}
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
