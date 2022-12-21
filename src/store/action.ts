import { createAction } from '@reduxjs/toolkit';
import { BasketProducts } from '../types/basket';
import { Product } from '../types/product';
import { CurrentCatalogPathType } from '../types/query-parameters';

const Action = {
  SET_REVIEW_MODAL_OPENING_STATUS: 'SET_REVIEW_MODAL_OPENING_STATUS',
  SET_PRICE_RANGE_ERROR_STATUS: ' SET_PRICE_RANGE_ERROR_STATUS',
  SET_REVIEW_ERROR_STATUS: 'SET_REVIEW_ERROR_STATUS',
  SET_SEARCH_ERROR_STATUS: 'SET_SEARCH_ERROR_STATUS',
  SET_REVIEW_SUCCESS_OPENING_STATUS: 'SET_REVIEW_SUCCESs_OPENING_STATUS',
  SET_ORDER_SUCCESS_STATUS: 'SET_ORDER_SUCCESS_STATUS',
  SET_SELECTED_PRODUCT_ERROR_STATUS: 'SET_SELECTED_PRODUCT_ERROR_STATUS',
  SET_BASKET_MODAL_OPENING_STATUS: 'SET_BASKET_MODAL_OPENING_STATUS',
  SET_BASKET_REMOVE_PRODUCT_MODAL_OPENING_STATUS: 'SET_BASKET_REMOVE_PRODUCT_MODAL_OPENING_STATUS',
  SET_BASKET_SUCCESS_OPENING_STATUS: 'SET_BASKET_SUCCESS_OPENING_STATUS',
  SET_ORDER_ERROR_STATUS: 'SET_ORDER_ERROR_STATUS',
  REDIRECT_TO_ROUTE: 'REDIRECT_TO_ROUTE',
  PRODUCT_DETAILS_SHOWN: 'PRODUCT_DETAILS_SHOWN',
  REMOVE_SEARCHED_PRODUCTS: 'REMOVE_SEARCHED_PRODUCTS',
  SET_CURRENT_CATALOG_PATH: 'SET_CURRENT_CATALOG_PATH',
  SET_CURRENT_CATALOG_PRODUCT: 'SET_CURRENT_CATALOG_PRODUCT',
  SET_BASKET_PRODUCTS: 'SET_BASKET_PRODUCTS',
  SET_COUPON: 'SET_COUPON',
  SET_STATUS_COUPON: 'SET_STATUS_COUPON'
};

const redirectToRoute = createAction(Action.REDIRECT_TO_ROUTE, (value: string) => (
  {
    payload: value,
  }));

const setModalOpeningStatus = createAction(Action.SET_REVIEW_MODAL_OPENING_STATUS, (value: boolean) => (
  {
    payload: value,
  }));

const setBasketModalOpeningStatus = createAction(Action.SET_BASKET_MODAL_OPENING_STATUS, (value: boolean) => (
  {
    payload: value,
  }));

const setBasketRemoveProductModalOpeningStatus = createAction(Action.SET_BASKET_REMOVE_PRODUCT_MODAL_OPENING_STATUS, (value: boolean) => (
  {
    payload: value,
  }));

const setOrderErrorStatus = createAction(Action.SET_ORDER_ERROR_STATUS, (value: boolean) => (
  {
    payload: value,
  }));

const setOrderSuccesStatus = createAction(Action.SET_ORDER_SUCCESS_STATUS, (value: boolean) => (
  {
    payload: value,
  }));

const setReviewErrorStatus = createAction(Action.SET_REVIEW_ERROR_STATUS, (value: boolean) => (
  {
    payload: value,
  }));

const setSearchErrorStatus = createAction(Action.SET_SEARCH_ERROR_STATUS, (value: boolean) => (
  {
    payload: value,
  }));

const setBasketSuccessOpeningStatus = createAction(Action.SET_BASKET_SUCCESS_OPENING_STATUS, (value: boolean) => (
  {
    payload: value,
  }));


const setSuccessOpeningStatus = createAction(Action.SET_REVIEW_SUCCESS_OPENING_STATUS, (value: boolean) => (
  {
    payload: value,
  }));

const setPriceRangeErrorStatus = createAction(Action.SET_PRICE_RANGE_ERROR_STATUS, (value: boolean) => (
  {
    payload: value,
  }));

const setProductDetailsShown = createAction(Action.PRODUCT_DETAILS_SHOWN, (value: string) => (
  {
    payload: value,
  }));

const removeSearchedProducts = createAction(Action.REMOVE_SEARCHED_PRODUCTS, (value: null) => (
  {
    payload: value,
  }));

const setCurrentCatalogPath = createAction(Action.SET_CURRENT_CATALOG_PATH, (value: CurrentCatalogPathType) => (
  {
    payload: value,
  }));

const setCurrentCatalogProduct = createAction(Action.SET_CURRENT_CATALOG_PRODUCT, (value: Product) => (
  {
    payload: value,
  }));

const setBasketProducts = createAction(Action.SET_BASKET_PRODUCTS, (value: BasketProducts) => (
  {
    payload: value,
  }));

const setStatusCoupon = createAction(Action.SET_STATUS_COUPON, (value: boolean | undefined) => (
  {
    payload: value,
  }));

const setCoupon = createAction(Action.SET_COUPON, (value: string) => (
  {
    payload: value,
  }));

export {
  Action,
  redirectToRoute,
  setModalOpeningStatus,
  setReviewErrorStatus,
  setSuccessOpeningStatus,
  setOrderSuccesStatus,
  setProductDetailsShown,
  removeSearchedProducts,
  setCurrentCatalogPath,
  setPriceRangeErrorStatus,
  setSearchErrorStatus,
  setBasketModalOpeningStatus,
  setOrderErrorStatus,
  setBasketSuccessOpeningStatus,
  setCurrentCatalogProduct,
  setBasketRemoveProductModalOpeningStatus,
  setBasketProducts,
  setCoupon,
  setStatusCoupon
};
