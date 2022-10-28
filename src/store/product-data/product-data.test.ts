import { ProductDetailsType } from '../../helpers/const';
import { makeFakeProduct, makeFakeProducts, makeFakePromo } from '../../helpers/mock';
import { Product } from '../../types/product';
import { setProductDetailsShown, setSelectedProductErrorStatus } from '../action';
import { fetchProductsAction, fetchPromoAction, fetchSelectedProductAction, fetchSimilarProductsAction } from '../api-actions';
import { productData } from './product-data';

const products = makeFakeProducts();
const selectedProduct = makeFakeProduct();
const promo = makeFakePromo();

describe('Reducer: productData', () => {
  it('without additional parameters should return initial state', () => {
    expect(productData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        isPromoError: false,
        isDataLoaded: false,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        ProductDetails: ProductDetailsType.Description
      });
  });

  it('should update isSelectedProductError when dispatch setSelectedProductErrorStatus', () => {
    const state = {
      isPromoError: false,
      isDataLoaded: false,
      selectedProduct: {} as Product,
      isProductsError: false,
      isSimilarProductError: true,
      isSelectedProductError: false,
      products: [],
      similarProducts: [],
      ProductDetails: ProductDetailsType.Description
    };
    expect(productData.reducer(state, setSelectedProductErrorStatus(true)))
      .toEqual({
        isPromoError: false,
        isDataLoaded: false,
        isProductsError: false,
        isSimilarProductError: true,
        isSelectedProductError: true,
        products: [],
        similarProducts: [],
        ProductDetails: ProductDetailsType.Description
      });
  });

  it('should update ProductDetails when dispatch setProductDetailsShown', () => {
    const state = {
      isPromoError: false,
      isDataLoaded: false,
      selectedProduct: {} as Product,
      isProductsError: false,
      isSimilarProductError: false,
      isSelectedProductError: false,
      products: [],
      similarProducts: [],
      ProductDetails: ProductDetailsType.Description
    };
    expect(productData.reducer(state, setProductDetailsShown(ProductDetailsType.Specification)))
      .toEqual({
        isPromoError: false,
        isDataLoaded: false,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        ProductDetails: ProductDetailsType.Specification
      });
  });

  describe('fetchPromoAction', () => {
    it('should update promo by load promo', () => {
      const state = {
        isPromoError: false,
        isDataLoaded: false,
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        ProductDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchPromoAction.fulfilled.type, payload: promo }))
        .toEqual({
          promo: promo,
          products: [],
          isPromoError: false,
          isDataLoaded: false,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          similarProducts: [],
          ProductDetails: ProductDetailsType.Description,
        });
    });

    it('should update isPromoError when fetchPromoAction.rejected', () => {
      const state = {
        isPromoError: false,
        isDataLoaded: false,
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        ProductDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchPromoAction.rejected.type }))
        .toEqual({
          products: [],
          isPromoError: true,
          isDataLoaded: false,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          similarProducts: [],
          ProductDetails: ProductDetailsType.Description,
        });
    });
  });

  describe('fetchSelectedProductAction', () => {
    it('should update selectedProduct by load selectedProduct', () => {
      const state = {
        isPromoError: false,
        isDataLoaded: false,
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        ProductDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchSelectedProductAction.fulfilled.type, payload: selectedProduct }))
        .toEqual({
          selectedProduct: selectedProduct,
          products: [],
          isPromoError: false,
          isDataLoaded: false,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          similarProducts: [],
          ProductDetails: ProductDetailsType.Description
        });
    });

    it('should update isDataLoaded,isSelectedProductError when fetchSelectedProductAction.pending', () => {
      const state = {
        isPromoError: false,
        isDataLoaded: false,
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        ProductDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchSelectedProductAction.pending.type, payload: selectedProduct }))
        .toEqual({
          products: [],
          isPromoError: false,
          selectedProduct: {} as Product,
          isDataLoaded: true,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          similarProducts: [],
          ProductDetails: ProductDetailsType.Description
        });
    });

    it('should update isDataLoaded,isSelectedProductError  when fetchPromoAction.rejected', () => {
      const state = {
        isPromoError: false,
        isDataLoaded: true,
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        ProductDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchSelectedProductAction.rejected.type }))
        .toEqual({
          products: [],
          isPromoError: false,
          isDataLoaded: false,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: true,
          similarProducts: [],
          ProductDetails: ProductDetailsType.Description
        });
    });
  });

  describe('fetchProductsAction', () => {
    it('should update products by load products', () => {
      const state = {
        isPromoError: false,
        isDataLoaded: false,
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        ProductDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchProductsAction.fulfilled.type, payload: products }))
        .toEqual({
          products: products,
          isPromoError: false,
          isDataLoaded: false,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          similarProducts: [],
          ProductDetails: ProductDetailsType.Description
        });
    });

    it('should update isDataLoaded when fetchProductsAction.pending', () => {
      const state = {
        isPromoError: false,
        selectedProduct: {} as Product,
        isDataLoaded: false,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        ProductDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchProductsAction.pending.type }))
        .toEqual({
          isPromoError: false,
          isDataLoaded: true,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          products: [],
          similarProducts: [],
          ProductDetails: ProductDetailsType.Description
        });
    });

    it('should update isDataLoaded, isProductsError when fetchProductsAction.rejected', () => {
      const state = {
        isPromoError: false,
        isDataLoaded: true,
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        ProductDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchProductsAction.rejected.type }))
        .toEqual({
          isPromoError: false,
          isDataLoaded: false,
          isProductsError: true,
          isSimilarProductError: false,
          isSelectedProductError: false,
          products: [],
          similarProducts: [],
          ProductDetails: ProductDetailsType.Description
        });
    });
  });

  describe('fetchSimilarProductsAction', () => {

    it('should update similarProducts by load similarProducts', () => {
      const state = {
        isPromoError: false,
        selectedProduct: {} as Product,
        isDataLoaded: false,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        ProductDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchSimilarProductsAction.fulfilled.type, payload: products }))
        .toEqual({
          products: [],
          isPromoError: false,
          isDataLoaded: false,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          similarProducts: products,
          ProductDetails: ProductDetailsType.Description
        });
    });
    it('should update isDataLoaded when fetchSimilarProductsAction.pending', () => {
      const state = {
        isPromoError: false,
        isDataLoaded: false,
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        ProductDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchSimilarProductsAction.pending.type }))
        .toEqual({
          isPromoError: false,
          isDataLoaded: true,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          products: [],
          similarProducts: [],
          ProductDetails: ProductDetailsType.Description
        });
    });
    it('should update isDataLoaded, isSimilarProductError when fetchSimilarProductsAction.rejected', () => {
      const state = {
        isPromoError: false,
        isDataLoaded: false,
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: true,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        ProductDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchSimilarProductsAction.rejected.type }))
        .toEqual({
          isPromoError: false,
          isDataLoaded: false,
          isProductsError: false,
          isSimilarProductError: true,
          isSelectedProductError: false,
          products: [],
          similarProducts: [],
          ProductDetails: ProductDetailsType.Description
        });
    });
  });

});
