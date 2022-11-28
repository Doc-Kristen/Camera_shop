import { createAction } from '@reduxjs/toolkit';
import { CurrentCatalogPathType } from '../types/query-parameters';

const Action = {
  SET_REVIEW_MODAL_OPENING_STATUS: 'SET_REVIEW_MODAL_OPENING_STATUS',
  SET_REVIEW_ERROR_STATUS: 'SET_REVIEW_ERROR_STATUS',
  SET_REVIEW_SUCCESS_OPENING_STATUS: 'SET_REVIEW_SUCCESs_OPENING_STATUS',
  SET_SELECTED_PRODUCT_ERROR_STATUS: 'SET_SELECTED_PRODUCT_ERROR_STATUS',
  REDIRECT_TO_ROUTE: 'REDIRECT_TO_ROUTE',
  PRODUCT_DETAILS_SHOWN: 'PRODUCT_DETAILS_SHOWN',
  REMOVE_SEARCHED_PRODUCTS: 'REMOVE_SEARCHED_PRODUCTS',
  SET_CURRENT_CATALOG_PATH: 'SET_CURRENT_CATALOG_PATH',
  RESET_PRICE_RANGE: 'RESET_PRICE_RANGE',
};

const redirectToRoute = createAction(Action.REDIRECT_TO_ROUTE, (value: string) => (
  {
    payload: value,
  }));

const setModalOpeningStatus = createAction(Action.SET_REVIEW_MODAL_OPENING_STATUS, (value: boolean) => (
  {
    payload: value,
  }));

const setReviewErrorStatus = createAction(Action.SET_REVIEW_ERROR_STATUS, (value: boolean) => (
  {
    payload: value,
  }));

const setSuccessOpeningStatus = createAction(Action.SET_REVIEW_SUCCESS_OPENING_STATUS, (value: boolean) => (
  {
    payload: value,
  }));

const setSelectedProductErrorStatus = createAction(Action.SET_SELECTED_PRODUCT_ERROR_STATUS, (value: boolean) => (
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

export {
  Action,
  redirectToRoute,
  setModalOpeningStatus,
  setReviewErrorStatus,
  setSuccessOpeningStatus,
  setSelectedProductErrorStatus,
  setProductDetailsShown,
  removeSearchedProducts,
  setCurrentCatalogPath,
};
