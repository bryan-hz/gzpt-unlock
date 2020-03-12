import { SET_ACTIVATE_LOGOUT_BUTTON } from 'constants/complete';

export const activateLogoutButton = () => ({
  type: SET_ACTIVATE_LOGOUT_BUTTON,
  payload: true
});

export const deactivateLogoutButton = () => ({
  type: SET_ACTIVATE_LOGOUT_BUTTON,
  payload: false
});
