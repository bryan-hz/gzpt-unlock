import { SET_REENTER } from 'constants/password';

const initialState = {
  showReenter: 0
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_REENTER:
      return {
        ...state,
        showReenter: payload
      };
    default:
      return state;
  }
};
