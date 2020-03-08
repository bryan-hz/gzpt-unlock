import { SET_REENTER } from 'constants/password';

export const setReenter = () => ({
  type: SET_REENTER,
  payload: 1
});

export const hideReenter = () => ({
  type: SET_REENTER,
  payload: 0
});
