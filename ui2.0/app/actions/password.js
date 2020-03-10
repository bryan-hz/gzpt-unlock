import { SET_REENTER, SET_INPUTS, SET_INCORRECT } from 'constants/password';

export const showReenter = () => ({
  type: pw_states.SET_REENTER,
  payload: true
});

export const hideReenter = () => ({
  type: pw_states.SET_REENTER,
  payload: false
});

export const setInputs = payload => ({
  type: SET_INPUTS,
  payload

export const showIncorrect = () => ({
  type: pw_states.SET_INCORRECT,
  payload: true
});

export const hideIncorrect = () => ({
  type: pw_states.SET_INCORRECT,
  payload: false
});

export const showCorrect = () => ({
  type: pw_states.SET_CORRECT,
  payload: true
});

export const hideCorrect = () => ({
  type: pw_states.SET_CORRECT,
  payload: false
});
