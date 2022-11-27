import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeSearchedProducts } from '../../store/action';
import { getProductDetails } from '../../store/product-data/selectors';
import { Products } from '../../types/product';

type SearchedProductsListProps = {
    searchedProducts: Products;
}

const SearchedProductsList = ({ searchedProducts }: SearchedProductsListProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const productDetails = useAppSelector(getProductDetails);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const searchList = document.getElementById('search-list');

      const bodyClickHandler = (evt: MouseEvent) => {
        if(evt.target !== searchList)
        {dispatch(removeSearchedProducts(null));}
        document.body.removeEventListener('click', bodyClickHandler);
      };
      document.body.addEventListener('click', bodyClickHandler);
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <ul
      className="form-search__select-list"
      id="search-list"
      data-testid='searched-products'
    >
      {
        searchedProducts.map((searchedProduct) =>
          (
            <Link
              onClick={
                () => {
                  dispatch(removeSearchedProducts(null));
                }
              }
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
  );
};

export default SearchedProductsList;
