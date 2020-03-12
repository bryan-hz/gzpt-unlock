import {
  SET_REENTER,
  SET_INCORRECT,
  SET_REJECT_PARAM,
  SET_CORRECT,
  SET_INPUTS,
  SET_MISMATCH,
  RESET_PASSWORD_STATES
} from 'constants/password';

const initialState = {
  showReenter: false,
  showIncorrect: false,
  showCorrect: false,
  showMismatch: false,
  activeButtons: [],
  activeLinks: [],
  nextPenaltyTime: 0,
  remainingTrials: 0
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
    case SET_REJECT_PARAM:
      return {
        ...state,
        remainingTrials: payload.remainingTrials,
        nextPenaltyTime: payload.nextPenaltyTime
      };
    case SET_CORRECT:
      return {
        ...state,
        showCorrect: payload
      };
    case SET_MISMATCH:
      return {
        ...state,
        showMismatch: payload
      };
    case RESET_PASSWORD_STATES:
      return initialState;
    default:
      return state;
  }
};
