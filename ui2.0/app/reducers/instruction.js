import {
  SET_GO_BACK_BUTTON,
  SET_READY_BUTTON,
  RESET_INSTRUCTION_STATES
} from 'constants/instruction';

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
    case RESET_INSTRUCTION_STATES:
      return initialState;
    default:
      return state;
  }
};
