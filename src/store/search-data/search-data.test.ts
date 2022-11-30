import { makeFakeProducts } from '../../helpers/mock';
import { fetchSearchQueryAction } from '../api-actions';
import { searchData } from './search-data';

const products = makeFakeProducts();

describe('Reducer: searchData', () => {
  it('without additional parameters should return initial state', () => {
    expect(searchData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        isSearchedProductsError: false
      });
  });

  it('fetchSearchQueryAction.fulfilled', () => {
    const state = {
      isSearchedProductsError: false
    };
    expect(searchData.reducer(state, { type: fetchSearchQueryAction.fulfilled.type, payload: products}))
      .toEqual({
        searchedProducts: products,
        isSearchedProductsError: false
      });
  });

  it('fetchSearchQueryAction.rejected', () => {
    const state = {
      isSearchedProductsError: false
    };
    expect(searchData.reducer(state, { type: fetchSearchQueryAction.rejected.type, payload: products}))
      .toEqual({
        isSearchedProductsError: true
      });
  });

});
