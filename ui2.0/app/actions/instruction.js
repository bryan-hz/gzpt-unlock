import { SET_GO_BACK_BUTTON, SET_READY_BUTTON } from 'constants/instruction';

export const activateGoBackButton = () => ({
  type: SET_GO_BACK_BUTTON,
  payload: true
});

export const deactivateGoBackButton = () => ({
  type: SET_GO_BACK_BUTTON,
  payload: false
});

export const activateReadyButton = () => ({
  type: SET_READY_BUTTON,
  payload: true
});

export const deactivateReadyButton = () => ({
  type: SET_READY_BUTTON,
  payload: false
});
