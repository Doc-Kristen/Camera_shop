import { ChangeEvent, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productFilterType } from '../../helpers/const';
import { isKeyPressed } from '../../helpers/utils';
import { useAppSelector } from '../../hooks';
import { usePriceFilter } from '../../hooks/use-price-filter';
import { getCurrentCatalogPath } from '../../store/path-process/selectors';
import { getDataLoadedStatus, getMaxProductPrice, getMinProductPrice } from '../../store/product-data/selectors';
import { getResetFilterStatus } from '../../store/user-process/selectors';

const CatalogFilter = (): JSX.Element => {

  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useAppSelector(getCurrentCatalogPath);
  const isProductsLoaded = useAppSelector(getDataLoadedStatus);
  const isFilterReset = useAppSelector(getResetFilterStatus);
  const minProductPrice = useAppSelector(getMinProductPrice);
  const maxProductPrice = useAppSelector(getMaxProductPrice);
  const priceRangeValueDefault = {
    minProductPrice: '',
    maxProductPrice: ''
  };

  const [
    formData,
    handleInputChangePrice,
    validatePriceValue,
    handleButtonClick
  ] = usePriceFilter(priceRangeValueDefault);

  const minPriceValue = formData.minProductPrice ? formData.minProductPrice : '';
  const maxPriceValue = formData.maxProductPrice ? formData.maxProductPrice : '';

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const categoryFilter = target.getAttribute('data-filter-type');
    const value = target.getAttribute('data-value');

    if (!searchParams.getAll(categoryFilter ? categoryFilter : '').includes(String(value))) {
      searchParams.append(String(categoryFilter), String(value));
      setSearchParams(searchParams);
      return;
    }
    const newParams = Array.from(searchParams.entries())
      .filter(([_, currentValue]) => currentValue !== value);
    const newSearchParams = new URLSearchParams(newParams);
    setSearchParams(newSearchParams);

  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const keyCloseHandler = (evt: KeyboardEvent) => {
        if (isKeyPressed(evt, 'Enter')) {
          setSearchParams(searchParams);
          validatePriceValue();
        }
      };
      document.addEventListener('keydown', keyCloseHandler);
      return () => {
        document.removeEventListener('keydown', keyCloseHandler);
      };
    }
    return () => {
      isMounted = false;
    };
  }, [searchParams, setSearchParams, validatePriceValue, isFilterReset, handleButtonClick]);

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  data-testid='price_gte'
                  type="number"
                  name="price"
                  id='price_gte'
                  placeholder={String(minProductPrice)}
                  onChange={handleInputChangePrice}
                  value={isFilterReset ? '' : minPriceValue}
                  autoComplete='off'
                  disabled={isProductsLoaded}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  data-testid='price_lte'
                  type="number"
                  name="priceUp"
                  id='price_lte'
                  placeholder={String(maxProductPrice)}
                  onChange={handleInputChangePrice}
                  value={isFilterReset ? '' : maxPriceValue}
                  autoComplete='off'
                  disabled={isProductsLoaded}
                />
              </label>
            </div>
          </div>
        </fieldset>
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
                    <span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{item.Label}</span>
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
          className="btn catalog-filter__reset-btn" type="button"
          onClick={handleButtonClick}
          disabled={search === '' || isProductsLoaded}
        >Сбросить фильтры
        </button>
      </form>
    </div>
  );
};

export default CatalogFilter;
