import { SET_REENTER, SET_INCORRECT } from 'constants/password';

export const showReenter = () => ({
  type: SET_REENTER,
  payload: true
});

export const hideReenter = () => ({
  type: SET_REENTER,
  payload: false
});

export const showIncorrect = () => ({
  type: SET_INCORRECT,
  payload: true
});
