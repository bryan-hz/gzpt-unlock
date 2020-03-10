import {
  SET_REENTER,
  SET_CORRECT,
  SET_INCORRECT,
  SET_MISMATCH,
  SET_INPUTS
} from 'constants/password';

export const showReenter = () => ({
  type: SET_REENTER,
  payload: true
});

export const hideReenter = () => ({
  type: SET_REENTER,
  payload: false
});

export const setInputs = payload => ({
  type: SET_INPUTS,
  payload

export const showIncorrect = () => ({
  type: SET_INCORRECT,
  payload: true
});

export const hideIncorrect = () => ({
  type: SET_INCORRECT,
  payload: false
});

export const showCorrect = () => ({
  type: SET_CORRECT,
  payload: true
});

export const hideCorrect = () => ({
  type: SET_CORRECT,
  payload: false
});

export const showMismatch = () => ({
  type: SET_MISMATCH,
  payload: true
});

export const hideMismatch = () => ({
  type: SET_MISMATCH,
  payload: false
});
