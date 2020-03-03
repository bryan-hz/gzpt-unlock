import {
  SAVE_INPUT,
  TRY_CONNECT,
  SET_CONNECTING,
  SET_VERIFIED,
  SET_CALIBRATION_COUNTDOWN
} from 'constants/preparation';

export const saveInput = payload => ({
  type: SAVE_INPUT,
  payload
});

export const tryConnect = payload => ({
  type: TRY_CONNECT,
  payload
});

export const setConnecting = payload => ({
  type: SET_CONNECTING,
  payload
});

export const setVerified = payload => ({
  type: SET_VERIFIED,
  payload
});

export const setCalibrationCountdown = payload => ({
  type: SET_CALIBRATION_COUNTDOWN,
  payload
});
