import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isKeyPressed } from '../../helpers/utils';
import { useAppSelector } from '../../hooks';
import { UsePriceFilter } from '../../hooks/use-price-filter';
import { getDataLoadedStatus, getMaxProductPrice, getMinProductPrice } from '../../store/product-data/selectors';

const PriceRangeFilter = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isProductsLoaded = useAppSelector(getDataLoadedStatus);
  const minProductPrice = useAppSelector(getMinProductPrice);
  const maxProductPrice = useAppSelector(getMaxProductPrice);
  const priceRangeValueDefault = {
    minProductPrice: '',
    maxProductPrice: ''
  };

  const [
    formData,
    handleInputChange,
    validatePriceValue
  ] = UsePriceFilter(priceRangeValueDefault);

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
  }, [searchParams, setSearchParams, validatePriceValue]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              id='price_gte'
              placeholder={String(minProductPrice)}
              onChange={handleInputChange}
              value={formData.minProductPrice}
              disabled={isProductsLoaded}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              id='price_lte'
              placeholder={String(maxProductPrice)}
              onChange={handleInputChange}
              value={formData.maxProductPrice}
              disabled={isProductsLoaded}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default PriceRangeFilter;