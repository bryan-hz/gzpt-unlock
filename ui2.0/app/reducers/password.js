import { SET_REENTER, SET_INCORRECT } from 'constants/password';

const initialState = {
  showReenter: false,
  showIncorrect: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_REENTER:
      return {
        ...state,
        showReenter: payload
      };
    case SET_INCORRECT:
      return {
        ...state,
        showIncorrect: payload
      };
    default:
      return state;
  }
};
