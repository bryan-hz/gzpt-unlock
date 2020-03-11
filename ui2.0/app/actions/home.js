import { SET_LOADING_LOGIN, SET_LOADING_RESET } from 'constants/home';

export const setLoadingLogin = payload => ({
  type: SET_LOADING_LOGIN,
  payload
});

export const setLoadingReset = payload => ({
  type: SET_LOADING_RESET,
  payload
});
