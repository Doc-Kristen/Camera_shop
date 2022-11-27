import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isKeyPressed } from '../../helpers/utils';
import { useAppSelector } from '../../hooks';
import { usePriceFilter } from '../../hooks/use-price-filter';
import { getDataLoadedStatus, getMaxProductPrice, getMinProductPrice } from '../../store/product-data/selectors';
import { getResetFilterStatus } from '../../store/user-process/selectors';

const PriceRangeFilter = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isProductsLoaded = useAppSelector(getDataLoadedStatus);
  const minProductPrice = useAppSelector(getMinProductPrice);
  const maxProductPrice = useAppSelector(getMaxProductPrice);
  const isFilterReset = useAppSelector(getResetFilterStatus);

  const priceRangeValueDefault = {
    minProductPrice: '',
    maxProductPrice: ''
  };

  const [
    formData,
    handleInputChange,
    validatePriceValue,
  ] = usePriceFilter(priceRangeValueDefault);

  const minPriceValue = formData.minProductPrice ? formData.minProductPrice : '';
  const maxPriceValue = formData.maxProductPrice ? formData.maxProductPrice : '';

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
  }, [searchParams, setSearchParams, validatePriceValue, isFilterReset]);

  return (
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              value={isFilterReset ? '' : maxPriceValue}
              autoComplete='off'
              disabled={isProductsLoaded}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default PriceRangeFilter;
