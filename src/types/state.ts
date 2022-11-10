import { store } from '../store/index';
import { Product, Products } from './product';
import { Promo } from './promo';
import { Reviews } from './review';

type State = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

type UserProcess = {
    searchedProducts: boolean;
    isFormBlocked: boolean;
    isReviewPosted: boolean;
    isErrorSendingReview: boolean;
    isReviewSuccess: boolean;
};

type ReviewData = {
    reviews: Reviews;
    isReviewsError: boolean;
    isReviewsLoaded: boolean;
}

type ProductData = {
    promo?: Promo;
    isPromoError: boolean;
    isDataLoaded: boolean;
    isProductsError: boolean;
    isSimilarProductError: boolean;
    isSelectedProductError: boolean;
    products: Products;
    selectedProduct: Product;
    similarProducts: Products;
    ProductDetails: string;
  }

  type SearchData = {
    searchedProducts: Products;
}


export type { State, AppDispatch, UserProcess, ReviewData, ProductData, SearchData };
