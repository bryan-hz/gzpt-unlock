import { SET_ACTIVATE_LOGOUT_BUTTON } from 'constants/complete';

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
    default:
      return state;
  }
};
