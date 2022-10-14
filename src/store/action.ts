import { createAction } from '@reduxjs/toolkit';

const Action = {
//   REDIRECT_TO_ROUTE: 'REDIRECT_TO_ROUTE',
  SET_REVIEW_MODAL_OPENING_STATUS: 'SET_REVIEW_MODAL_OPENING_STATUS',
  //   SET_REVIEW_MODAL_BLOCKING_STATUS: 'SET_REVIEW_MODAL_BLOCKING_STATUS',
  SET_REVIEW_ERROR_STATUS: 'SET_REVIEW_ERROR_STATUS'
};

// const redirectToRoute = createAction(Action.REDIRECT_TO_ROUTE, (value) => (
//   {
//     payload: value,
//   }));

const setModalOpeningStatus = createAction(Action.SET_REVIEW_MODAL_OPENING_STATUS, (value : boolean) => (
  {
    payload: value,
  }));

const setOrderErrorStatus = createAction(Action.SET_REVIEW_ERROR_STATUS, (value : boolean) => (
  {
    payload: value,
  }));

export {
  Action,
  //   redirectToRoute,
  setModalOpeningStatus,
  setOrderErrorStatus
};
