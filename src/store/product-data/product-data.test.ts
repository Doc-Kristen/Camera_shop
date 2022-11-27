import { ProductDetailsType } from '../../helpers/const';
import { makeFakeProduct, makeFakeProducts, makeFakePromo } from '../../helpers/mock';
import { Product } from '../../types/product';
import { setProductDetailsShown, setSelectedProductErrorStatus } from '../action';
import { fetchProductsAction, fetchProductsByPriceAction, fetchPromoAction, fetchSelectedProductAction, fetchSimilarProductsAction } from '../api-actions';
import { productData } from './product-data';

const products = makeFakeProducts();
const fakePagesCount = 0;
const fakeProductsActionPayload = {
  data: products,
  productsTotalCount: fakePagesCount,
};

const fakePriceRangeActionPayload = {
  minProductPrice: 1999,
  maxProductPrice: 3999,
};
const selectedProduct = makeFakeProduct();
const promo = makeFakePromo();

describe('Reducer: productData', () => {
  it('without additional parameters should return initial state', () => {
    expect(productData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        isPromoError: false,
        isDataLoaded: false,
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        minProductPrice: 'от',
        maxProductPrice: 'до',
        pagesCount: fakePagesCount,
        similarProducts: [],
        productDetails: ProductDetailsType.Description
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
      minProductPrice: 'от',
      maxProductPrice: 'до',
      pagesCount: fakePagesCount,
      similarProducts: [],
      productDetails: ProductDetailsType.Description
    };
    expect(productData.reducer(state, setSelectedProductErrorStatus(true)))
      .toEqual({
        isPromoError: false,
        isDataLoaded: false,
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: true,
        isSelectedProductError: true,
        products: [],
        minProductPrice: 'от',
        maxProductPrice: 'до',
        pagesCount: fakePagesCount,
        similarProducts: [],
        productDetails: ProductDetailsType.Description
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
      minProductPrice: 'от',
      maxProductPrice: 'до',
      pagesCount: fakePagesCount,
      similarProducts: [],
      productDetails: ProductDetailsType.Description
    };
    expect(productData.reducer(state, setProductDetailsShown(ProductDetailsType.Specification)))
      .toEqual({
        isPromoError: false,
        isDataLoaded: false,
        pagesCount: fakePagesCount,
        selectedProduct: {} as Product,
        isProductsError: false,
        minProductPrice: 'от',
        maxProductPrice: 'до',
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        productDetails: ProductDetailsType.Specification
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
        minProductPrice: 'от',
        maxProductPrice: 'до',
        similarProducts: [],
        pagesCount: fakePagesCount,
        productDetails: ProductDetailsType.Description,
        productsByPrice: []
      };
      expect(productData.reducer(state, { type: fetchPromoAction.fulfilled.type, payload: promo }))
        .toEqual({
          promo: promo,
          products: [],
          minProductPrice: 'от',
          maxProductPrice: 'до',
          selectedProduct: {} as Product,
          isPromoError: false,
          isDataLoaded: false,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          similarProducts: [],
          pagesCount: fakePagesCount,
          productDetails: ProductDetailsType.Description,
          productsByPrice: []
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
        minProductPrice: 'от',
        maxProductPrice: 'до',
        similarProducts: [],
        pagesCount: fakePagesCount,
        productDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchPromoAction.rejected.type }))
        .toEqual({
          products: [],
          isPromoError: true,
          selectedProduct: {} as Product,
          isDataLoaded: false,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          minProductPrice: 'от',
          maxProductPrice: 'до',
          similarProducts: [],
          pagesCount: fakePagesCount,
          productDetails: ProductDetailsType.Description,
        });
    });
  });

  describe('fetchSelectedProductAction', () => {
    it('should update selectedProduct by load selectedProduct', () => {
      const state = {
        isPromoError: false,
        isDataLoaded: false,
        minProductPrice: 'от',
        maxProductPrice: 'до',
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        pagesCount: fakePagesCount,
        productDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchSelectedProductAction.fulfilled.type, payload: selectedProduct }))
        .toEqual({
          selectedProduct: selectedProduct,
          products: [],
          minProductPrice: 'от',
          maxProductPrice: 'до',
          isPromoError: false,
          isDataLoaded: false,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          similarProducts: [],
          pagesCount: fakePagesCount,
          productDetails: ProductDetailsType.Description
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
        minProductPrice: 'от',
        maxProductPrice: 'до',
        similarProducts: [],
        pagesCount: fakePagesCount,
        productDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchSelectedProductAction.pending.type, payload: selectedProduct }))
        .toEqual({
          products: [],
          minProductPrice: 'от',
          maxProductPrice: 'до',
          isPromoError: false,
          selectedProduct: {} as Product,
          isDataLoaded: true,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          similarProducts: [],
          pagesCount: fakePagesCount,
          productDetails: ProductDetailsType.Description
        });
    });

    it('should update isDataLoaded,isSelectedProductError  when fetchPromoAction.rejected', () => {
      const state = {
        isPromoError: false,
        isDataLoaded: true,
        minProductPrice: 'от',
        maxProductPrice: 'до',
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        pagesCount: fakePagesCount,
        productDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchSelectedProductAction.rejected.type }))
        .toEqual({
          products: [],
          minProductPrice: 'от',
          maxProductPrice: 'до',
          selectedProduct: {} as Product,
          isPromoError: false,
          isDataLoaded: false,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: true,
          pagesCount: fakePagesCount,
          similarProducts: [],
          productDetails: ProductDetailsType.Description
        });
    });
  });

  describe('fetchProductsAction', () => {
    it('should update products by load products', () => {
      const state = {
        isPromoError: false,
        isDataLoaded: false,
        minProductPrice: 'от',
        maxProductPrice: 'до',
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        pagesCount: fakePagesCount,
        similarProducts: [],
        productDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchProductsAction.fulfilled.type, payload: fakeProductsActionPayload }))
        .toEqual({
          products: fakeProductsActionPayload.data,
          isPromoError: false,
          minProductPrice: 'от',
          maxProductPrice: 'до',
          selectedProduct: {} as Product,
          isDataLoaded: false,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          pagesCount: fakeProductsActionPayload.productsTotalCount,
          similarProducts: [],
          productDetails: ProductDetailsType.Description
        });
    });

    it('should update isDataLoaded when fetchProductsAction.pending', () => {
      const state = {
        isPromoError: false,
        minProductPrice: 'от',
        maxProductPrice: 'до',
        selectedProduct: {} as Product,
        pagesCount: fakePagesCount,
        isDataLoaded: false,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        similarProducts: [],
        productDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchProductsAction.pending.type }))
        .toEqual({
          isPromoError: false,
          isDataLoaded: true,
          minProductPrice: 'от',
          maxProductPrice: 'до',
          pagesCount: fakePagesCount,
          selectedProduct: {} as Product,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          products: [],
          similarProducts: [],
          productDetails: ProductDetailsType.Description
        });
    });

    it('should update isDataLoaded, isProductsError when fetchProductsAction.rejected', () => {
      const state = {
        isPromoError: false,
        isDataLoaded: true,
        minProductPrice: 'от',
        maxProductPrice: 'до',
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        pagesCount: fakePagesCount,
        similarProducts: [],
        productDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchProductsAction.rejected.type }))
        .toEqual({
          isPromoError: false,
          isDataLoaded: false,
          minProductPrice: 'от',
          maxProductPrice: 'до',
          selectedProduct: {} as Product,
          isProductsError: true,
          isSimilarProductError: false,
          isSelectedProductError: false,
          products: [],
          similarProducts: [],
          pagesCount: fakePagesCount,
          productDetails: ProductDetailsType.Description
        });
    });
  });

  describe('fetchSimilarProductsAction', () => {

    it('should update similarProducts by load similarProducts', () => {
      const state = {
        isPromoError: false,
        minProductPrice: 'от',
        maxProductPrice: 'до',
        selectedProduct: {} as Product,
        isDataLoaded: false,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        pagesCount: fakePagesCount,
        similarProducts: [],
        productDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchSimilarProductsAction.fulfilled.type, payload: products }))
        .toEqual({
          products: [],
          minProductPrice: 'от',
          maxProductPrice: 'до',
          selectedProduct: {} as Product,
          isPromoError: false,
          isDataLoaded: false,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          similarProducts: products,
          pagesCount: fakePagesCount,
          productDetails: ProductDetailsType.Description
        });
    });
    it('should update isDataLoaded when fetchSimilarProductsAction.pending', () => {
      const state = {
        isPromoError: false,
        isDataLoaded: false,
        minProductPrice: 'от',
        maxProductPrice: 'до',
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        pagesCount: fakePagesCount,
        similarProducts: [],
        productDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchSimilarProductsAction.pending.type }))
        .toEqual({
          isPromoError: false,
          isDataLoaded: true,
          minProductPrice: 'от',
          maxProductPrice: 'до',
          selectedProduct: {} as Product,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          products: [],
          pagesCount: fakePagesCount,
          similarProducts: [],
          productDetails: ProductDetailsType.Description
        });
    });
    it('should update isDataLoaded, isSimilarProductError when fetchSimilarProductsAction.rejected', () => {
      const state = {
        isPromoError: false,
        minProductPrice: 'от',
        maxProductPrice: 'до',
        isDataLoaded: false,
        selectedProduct: {} as Product,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        pagesCount: fakePagesCount,
        similarProducts: [],
        productDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchSimilarProductsAction.rejected.type }))
        .toEqual({
          isPromoError: false,
          isDataLoaded: false,
          minProductPrice: 'от',
          maxProductPrice: 'до',
          selectedProduct: {} as Product,
          isProductsError: false,
          isSimilarProductError: true,
          isSelectedProductError: false,
          products: [],
          pagesCount: fakePagesCount,
          similarProducts: [],
          productDetails: ProductDetailsType.Description
        });
    });
  });

  describe('fetchProductsByPriceAction', () => {

    it('should update minProductPrice,maxProductPrice by load fetchProductsByPriceAction', () => {
      const state = {
        isPromoError: false,
        minProductPrice: 'от',
        maxProductPrice: 'до',
        selectedProduct: {} as Product,
        isDataLoaded: false,
        isProductsError: false,
        isSimilarProductError: false,
        isSelectedProductError: false,
        products: [],
        pagesCount: fakePagesCount,
        similarProducts: [],
        productDetails: ProductDetailsType.Description
      };
      expect(productData.reducer(state, { type: fetchProductsByPriceAction.fulfilled.type, payload: fakePriceRangeActionPayload }))
        .toEqual({
          products: [],
          minProductPrice: fakePriceRangeActionPayload.minProductPrice,
          maxProductPrice: fakePriceRangeActionPayload.maxProductPrice,
          selectedProduct: {} as Product,
          isPromoError: false,
          isDataLoaded: false,
          isProductsError: false,
          isSimilarProductError: false,
          isSelectedProductError: false,
          similarProducts: [],
          pagesCount: fakePagesCount,
          productDetails: ProductDetailsType.Description
        });
    });
  });

});
