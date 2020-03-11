import {
  SET_GO_BACK_BUTTON,
  SET_READY_BUTTON
} from 'constants/loginInstruction';

export const loginActivateGoBackButton = () => ({
  type: SET_GO_BACK_BUTTON,
  payload: true
});

export const loginDeactivateGoBackButton = () => ({
  type: SET_GO_BACK_BUTTON,
  payload: false
});

export const loginActivateReadyButton = () => ({
  type: SET_READY_BUTTON,
  payload: true
});

export const loginDeactivateReadyButton = () => ({
  type: SET_READY_BUTTON,
  payload: false
});
