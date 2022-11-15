import { createAction } from '@reduxjs/toolkit';

const Action = {
  SET_REVIEW_MODAL_OPENING_STATUS: 'SET_REVIEW_MODAL_OPENING_STATUS',
  SET_REVIEW_ERROR_STATUS: 'SET_REVIEW_ERROR_STATUS',
  SET_REVIEW_SUCCESS_OPENING_STATUS: 'SET_REVIEW_SUCCESs_OPENING_STATUS',
  SET_SELECTED_PRODUCT_ERROR_STATUS: 'SET_SELECTED_PRODUCT_ERROR_STATUS',
  REDIRECT_TO_ROUTE: 'REDIRECT_TO_ROUTE',
  PRODUCT_DETAILS_SHOWN: 'PRODUCT_DETAILS_SHOWN',
  REMOVE_SEARCHED_PRODUCTS: 'REMOVE_SEARCHED_PRODUCTS',
  SET_SORTING_TYPE: 'SET_SORTING_TYPE',
  SET_ORDER_SORTING_TYPE: 'SET_ORDER_SORTING_TYPE'
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

const removeSearchedProducts = createAction(Action.REMOVE_SEARCHED_PRODUCTS, (value: undefined) => (
  {
    payload: value,
  }));

const setSortingType = createAction(Action.SET_SORTING_TYPE, (value: string) => (
  {
    payload: value,
  }));

const setOrderSortingType = createAction(Action.SET_ORDER_SORTING_TYPE, (value: string) => (
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
  setSortingType,
  setOrderSortingType
};
