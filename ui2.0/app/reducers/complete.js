import {
  SET_ACTIVATE_LOGOUT_BUTTON,
  RESET_COMPLETE_STATES
} from 'constants/complete';

const initialState = {
  activateLogoutButton: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ACTIVATE_LOGOUT_BUTTON:
      return {
        ...state,
        activateLogoutButton: payload
      };
    case RESET_COMPLETE_STATES:
      return initialState;
    default:
      return state;
  }
};
