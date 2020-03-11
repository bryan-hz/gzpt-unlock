import {
  SET_GO_BACK_BUTTON,
  SET_READY_BUTTON
} from 'constants/loginInstruction';

const initialState = {
  activateGoBackButton: false,
  activateReadyButton: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_GO_BACK_BUTTON:
      return {
        ...state,
        activateGoBackButton: payload
      };
    case SET_READY_BUTTON:
      return {
        ...state,
        activateReadyButton: payload
      };
    default:
      return state;
  }
};
