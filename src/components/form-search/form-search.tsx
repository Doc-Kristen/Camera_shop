import { useAppSelector } from '../../hooks';
import { useSearch } from '../../hooks/use-search';
import { getsearchedProducts } from '../../store/search-data/selectors';
import { SearchQuery } from '../../types/search';
import { Link } from 'react-router-dom';
import { getProductDetails } from '../../store/product-data/selectors';

const FormSearch = (): JSX.Element => {

  const searchedProducts = useAppSelector(getsearchedProducts);
  const productDetails = useAppSelector(getProductDetails);

  const formSearchDefault : SearchQuery = {
    searchQuery: '',
  };

  const [
    formData,
    handleInputChange,] = useSearch(formSearchDefault);

  return(
    <div className={`form-search ${searchedProducts.length > 0 ? 'list-opened' : ''}`}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={formData.searchQuery}
            onChange={handleInputChange}
          />
        </label>
        <ul className="form-search__select-list">
          {
            searchedProducts.map((searchedProduct) =>
              (
                <Link
                  key={searchedProduct.id}
                  to={`/catalog/${searchedProduct.id}/${productDetails}`}
                >
                  <li
                    className="form-search__select-item"
                  >{searchedProduct.name}
                  </li>
                </Link>)
            )
          }
        </ul>
      </form>
      <button className="form-search__reset" type="reset">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
};

export default FormSearch;
