import { SET_REENTER, SET_INCORRECT, SET_CORRECT } from 'constants/password';

const initialState = {
  showReenter: false,
  showIncorrect: false,
  showCorrect: false
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
    case SET_CORRECT:
      return {
        ...state,
        showCorrect: payload
      };
    default:
      return state;
  }
};
