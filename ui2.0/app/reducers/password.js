import { SET_REENTER, SET_INCORRECT, SET_CORRECT,SET_INPUTS } from 'constants/password';

const initialState = {
  showReenter: false,
  showIncorrect: false,
  showCorrect: false,
  activeButtons: ['1', '4', '3', '2'],
  activeLinks: ['14', '43', '32']
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
    case SET_INPUTS:
      return {
        ...state,
        activeButtons: payload.buttons,
        activeLinks: payload.links
      };
    default:
      return state;
  }
};
