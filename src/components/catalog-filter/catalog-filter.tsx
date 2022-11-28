import { ChangeEvent } from 'react';
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, productFilterType } from '../../helpers/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useResetPageParams } from '../../hooks/use-reset-page-params';
import { resetFilter } from '../../store/action';
import { getCurrentCatalogPath } from '../../store/path-process/selectors';
import { getDataLoadedStatus } from '../../store/product-data/selectors';
import { PriceRangeFilter } from '../price-range-filter/price-range-filter';

const CatalogFilter = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useAppSelector(getCurrentCatalogPath);

  const isProductsLoaded = useAppSelector(getDataLoadedStatus);

  const [
    resetPageParams
  ] = useResetPageParams();

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch(resetFilter(false));
    const categoryFilter = target.getAttribute('data-filter-type');
    const value = target.getAttribute('data-value');

    if (!searchParams.getAll(categoryFilter ? categoryFilter : '').includes(String(value))) {
      searchParams.append(String(categoryFilter), String(value));
      setSearchParams(searchParams);
      resetPageParams(searchParams);
      return;
    }
    const newParams = Array.from(searchParams.entries())
      .filter(([_, currentValue]) => currentValue !== value);
    const newSearchParams = new URLSearchParams(newParams);
    setSearchParams(newSearchParams);
    resetPageParams(newSearchParams);
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <PriceRangeFilter />
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          {
            productFilterType.category.map((item) =>
              (
                <div
                  key={item.Name}
                  className="custom-checkbox catalog-filter__item"
                >
                  <label>
                    <input
                      type="checkbox"
                      data-filter-type='category'
                      data-value={item.Label}
                      name={item.Name}
                      onChange={handleInputChange}
                      disabled={(item.Label === 'Видеокамера' && (search?.includes('Моментальная') || search?.includes('Плёночная'))) || isProductsLoaded}
                      checked={search?.includes(item.Label) || false}
                    />
                    <span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{item.Label === 'Фотоаппарат' ? 'Фотокамера' : item.Label}</span>
                  </label>
                </div>
              ))
          }

        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          {
            productFilterType.type.map((item) =>
              (
                <div
                  key={item.Name}
                  className="custom-checkbox catalog-filter__item"
                >
                  <label>
                    <input
                      type="checkbox"
                      data-filter-type='type'
                      data-value={item.Label}
                      name={item.Name}
                      onChange={handleInputChange}
                      checked={search?.includes(item.Label) || false}
                      disabled={(search?.includes('Видеокамера') && (item.Label === 'Плёночная' || item.Label === 'Моментальная')) || isProductsLoaded}
                    />
                    <span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{item.Label}</span>
                  </label>
                </div>
              ))
          }
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          {
            productFilterType.level.map((item) =>
              (
                <div
                  key={item.Name}
                  className="custom-checkbox catalog-filter__item"
                >
                  <label>
                    <input
                      type="checkbox"
                      data-filter-type='level'
                      data-value={item.Label}
                      name={item.Name}
                      onChange={handleInputChange}
                      disabled={isProductsLoaded}
                      checked={search?.includes(item.Label) || false}
                    />
                    <span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{item.Label}</span>
                  </label>
                </div>
              ))
          }
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn" type="reset"
          onClick={() => {
            dispatch(resetFilter(true));
            setSearchParams(undefined);
            navigate({
              pathname: generatePath(AppRoute.Products, { pageNumber: String(DEFAULT_PAGE) }),
              search: decodeURI('')
            });
          }}
          disabled={search === '' || isProductsLoaded}
        >Сбросить фильтры
        </button>
      </form>
    </div>
  );
};

export default CatalogFilter;
