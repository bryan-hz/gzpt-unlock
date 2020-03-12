import {
  SET_LOADING_LOGIN,
  SET_LOADING_RESET,
  RESET_HOME_STATES
} from 'constants/home';

export const setLoadingLogin = payload => ({
  type: SET_LOADING_LOGIN,
  payload
});

export const setLoadingReset = payload => ({
  type: SET_LOADING_RESET,
  payload
});

export const resetHomeStates = () => ({
  type: RESET_HOME_STATES
});
