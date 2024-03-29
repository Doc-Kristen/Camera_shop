import { ChangeEvent, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ERROR_MESSAGE_TIME, productFilterType, QueryParameterType } from '../../helpers/const';
import { isKeyPressed } from '../../helpers/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useClickOutsideElement } from '../../hooks/use-click-outside-element';
import { usePriceFilter } from '../../hooks/use-price-filter';
import { useResetPageParams } from '../../hooks/use-reset-page-params';
import { setPriceRangeErrorStatus } from '../../store/action';
import { getCurrentCatalogPath } from '../../store/path-process/selectors';
import { getDataLoadedStatus, getMaxProductPrice, getMinProductPrice, getRangeByPriceErrorStatus, } from '../../store/product-data/selectors';

const CatalogFilter = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useAppSelector(getCurrentCatalogPath);

  const isProductsLoaded = useAppSelector(getDataLoadedStatus);
  const isRangeByPriceError = useAppSelector(getRangeByPriceErrorStatus);

  const minProductPrice = useAppSelector(getMinProductPrice);
  const maxProductPrice = useAppSelector(getMaxProductPrice);

  const inputMinPriceRef = useRef<HTMLInputElement>(null);
  const inputMaxPriceRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const minPriceSearch = searchParams.get(QueryParameterType.PriceMinimum);
  const maxPriceSearch = searchParams.get(QueryParameterType.PriceMaximum);

  const priceRangeValueDefault = {
    minProductPrice: '',
    maxProductPrice: ''
  };

  const [
    formData,
    handleInputChangePrice,
    validatePriceValue,
    handleButtonClick
  ] = usePriceFilter(priceRangeValueDefault, inputMinPriceRef, inputMaxPriceRef, formRef);

  const [
    resetPageParams
  ] = useResetPageParams();

  const minPriceValue = formData.minProductPrice ? formData.minProductPrice : '';
  const maxPriceValue = formData.maxProductPrice ? formData.maxProductPrice : '';

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const categoryFilter = target.getAttribute('data-filter-type');
    const value = target.getAttribute('data-value');

    formData.minProductPrice ? searchParams.set(QueryParameterType.PriceMinimum, String(formData.minProductPrice)) : searchParams.delete(QueryParameterType.PriceMinimum);
    formData.maxProductPrice ? searchParams.set(QueryParameterType.PriceMaximum, String(formData.maxProductPrice)) : searchParams.delete(QueryParameterType.PriceMaximum);

    if (!searchParams.getAll(categoryFilter ? categoryFilter : '').includes(String(value))) {
      searchParams.append(String(categoryFilter), String(value));
      resetPageParams(searchParams);
      return;
    }
    const newParams = Array.from(searchParams.entries())
      .filter(([_, currentValue]) => currentValue !== value);
    const newSearchParams = new URLSearchParams(newParams);
    setSearchParams(newSearchParams);
    resetPageParams(newSearchParams);
  };

  useClickOutsideElement(inputMinPriceRef, inputMaxPriceRef, () => {
    setSearchParams(searchParams);
    validatePriceValue();
  });

  useEffect(() => {
    let isMounted = true;
    if (maxPriceSearch && inputMaxPriceRef.current?.value) {
      inputMaxPriceRef.current.value = String(maxProductPrice ? maxProductPrice : maxPriceSearch);
    }

    if (minPriceSearch && inputMinPriceRef.current?.value) {
      inputMinPriceRef.current.value = String(minProductPrice ? minProductPrice : maxPriceSearch);
    }
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
  }, [searchParams, validatePriceValue, maxProductPrice, minProductPrice, maxPriceSearch, minPriceSearch, setSearchParams]);

  if (isRangeByPriceError) {
    setTimeout(() => {
      dispatch(setPriceRangeErrorStatus(false));
    }, ERROR_MESSAGE_TIME);
  }

  return (
    <div className="catalog-filter">
      <form action="#" ref={formRef}>
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  data-testid='price_gte'
                  ref={inputMinPriceRef}
                  type="number"
                  name="price"
                  id='price_gte'
                  placeholder={String(minProductPrice ? minProductPrice : 'от')}
                  onChange={handleInputChangePrice}
                  value={minPriceValue}
                  disabled={isProductsLoaded}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  data-testid='price_lte'
                  type="number"
                  ref={inputMaxPriceRef}
                  name="priceUp"
                  id='price_lte'
                  placeholder={String(maxProductPrice ? maxProductPrice : 'до')}
                  onChange={handleInputChangePrice}
                  value={maxPriceValue}
                  disabled={isProductsLoaded}
                />
              </label>
            </div>
          </div>
          {
            isRangeByPriceError ?
              <span>Ошибка сервера.<br />
                Диапазон цен не загружен.
              </span> : null
          }
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
                      className='checkbox_filter'
                      type="checkbox"
                      data-filter-type='category'
                      data-value={item.Label}
                      name={item.Name}
                      onChange={handleInputChange}
                      disabled={isProductsLoaded}
                      checked={search?.includes(item.Label) || false}
                    />
                    <span
                      className="custom-checkbox__icon checkbox_filter"
                    >
                    </span>
                    <span className="custom-checkbox__label checkbox_filter">{item.Label === 'Фотоаппарат' ? 'Фотокамера' : item.Label}
                    </span>
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
                  id='type-filter'
                  key={item.Name}
                  className="custom-checkbox catalog-filter__item"
                >
                  <label>
                    <input
                      className='checkbox_filter'
                      type="checkbox"
                      data-filter-type='type'
                      data-value={item.Label}
                      name={item.Name}
                      onChange={handleInputChange}
                      checked={search?.includes(item.Label) || false}
                      disabled={(search?.includes('Видеокамера') && !search?.includes('Фотоаппарат') && (item.Label === 'Плёночная' || item.Label === 'Моментальная')) || isProductsLoaded}
                    />
                    <span
                      className="custom-checkbox__icon checkbox_filter"
                    >
                    </span>
                    <span className="custom-checkbox__label checkbox_filter">{item.Label}</span>
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
                  id='level-filter'
                  key={item.Name}
                  className="custom-checkbox catalog-filter__item"
                >
                  <label >
                    <input
                      className='checkbox_filter'
                      type="checkbox"
                      data-filter-type='level'
                      data-value={item.Label}
                      name={item.Name}
                      onChange={handleInputChange}
                      disabled={isProductsLoaded}
                      checked={search?.includes(item.Label) || false}
                    />
                    <span
                      className="custom-checkbox__icon checkbox_filter"
                    >
                    </span><span className="custom-checkbox__label checkbox_filter">{item.Label}</span>
                  </label>
                </div>
              ))
          }
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn" type="reset"
          id='reset-button'
          onClick={handleButtonClick}
          disabled={search === '' || isProductsLoaded}
        >Сбросить фильтры
        </button>
      </form>
    </div>
  );
};

export default CatalogFilter;
