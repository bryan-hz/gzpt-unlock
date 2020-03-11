import { SET_LOADING_LOGIN, SET_LOADING_RESET } from 'constants/home';

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
    default:
      return state;
  }
};
