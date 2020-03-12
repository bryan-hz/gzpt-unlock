import {
  SET_LOADING_LOGIN,
  SET_LOADING_RESET,
  RESET_HOME_STATES
} from 'constants/home';

const initialState = {
  loadingReset: false,
  loadingLogin: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING_RESET:
      return {
        ...state,
        loadingReset: payload
      };
    case SET_LOADING_LOGIN:
      return {
        ...state,
        loadingLogin: payload
      };
    case RESET_HOME_STATES:
      return initialState;
    default:
      return state;
  }
};
