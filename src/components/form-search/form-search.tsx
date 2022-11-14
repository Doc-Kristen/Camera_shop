import { useAppSelector } from '../../hooks';
import { useSearch } from '../../hooks/use-search';
import { getsearchedProducts } from '../../store/search-data/selectors';
import { SearchQuery } from '../../types/search';
import SearchedProductsList from '../searched-products-list/searched-products-list';

const FormSearch = (): JSX.Element => {

  const searchedProducts = useAppSelector(getsearchedProducts);

  const formSearchDefault: SearchQuery = {
    searchQuery: '',
  };

  const [
    formData,
    handleInputChange,
    handleButtonClick] = useSearch(formSearchDefault);

  return (
    <div className={`form-search ${searchedProducts && searchedProducts.length > 0 ? 'list-opened' : ''}`}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            data-testid="input-form-search"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={formData.searchQuery}
            onChange={handleInputChange}
          />
        </label>
        {
          searchedProducts ?
            <SearchedProductsList searchedProducts={searchedProducts} />
            : null
        }

      </form>
      <button
        className="form-search__reset list-opened"
        type="reset"
        onClick={handleButtonClick}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
};

export default FormSearch;
