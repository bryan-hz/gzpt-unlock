import { SET_REENTER } from 'constants/password';

export const showReenter = () => ({
  type: SET_REENTER,
  payload: true
});

export const hideReenter = () => ({
  type: SET_REENTER,
  payload: false
});
