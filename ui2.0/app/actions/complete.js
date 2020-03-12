import {
  SET_ACTIVATE_LOGOUT_BUTTON,
  RESET_COMPLETE_STATES
} from 'constants/complete';

export const activateLogoutButton = () => ({
  type: SET_ACTIVATE_LOGOUT_BUTTON,
  payload: true
});

export const deactivateLogoutButton = () => ({
  type: SET_ACTIVATE_LOGOUT_BUTTON,
  payload: false
});

export const resetCompleteStates = () => ({
  type: RESET_COMPLETE_STATES
});
