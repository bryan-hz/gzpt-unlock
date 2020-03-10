import { SET_REENTER, SET_INPUTS } from 'constants/password';

const initialState = {
  showReenter: false,
  showIncorrect: false
  activeButtons: [],
  activeLinks: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_REENTER:
      return {
        ...state,
        showReenter: payload
      };
    case SET_INPUTS:
      return {
        ...state,
        activeButtons: payload.buttons,
        activeLinks: payload.links
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
