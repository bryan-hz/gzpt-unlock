import {
  SAVE_INPUT,
  SET_VERIFIED,
  SET_CONNECTING,
  SET_CALIBRATION_COUNTDOWN
} from 'constants/preparation';

const initialState = {
  processorAddress: '',
  connecting: false,
  verified: undefined,
  calibrationCountdown: undefined
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_INPUT: {
      return {
        ...state,
        processorAddress: payload
      };
    }
    case SET_VERIFIED:
      return {
        ...state,
        verified: payload
      };
    case SET_CONNECTING:
      return {
        ...state,
        connecting: payload
      };
    case SET_CALIBRATION_COUNTDOWN:
      return {
        ...state,
        calibrationCountdown: payload
      };
    default:
      return state;
  }
};
