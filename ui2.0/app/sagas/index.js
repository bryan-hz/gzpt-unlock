import {
  // eslint-disable-next-line no-unused-vars
  select,
  put,
  race,
  all,
  call,
  take,
  delay,
  takeLatest
} from 'redux-saga/effects';
import { REDIRECT } from 'constants/redirect';
import _isEmpty from 'lodash/isEmpty';
import { history } from 'store/configureStore';
import { TRY_CONNECT } from 'constants/preparation';
import { PROCESSOR_ID, LOCAL_HOST } from 'constants/api';
import {
  setVerified,
  setConnecting,
  saveInput,
  setCalibrationCountdown
} from 'actions/preparation';
import { gotoHome } from 'actions/redirect';

const getUrl = ({ host, location }) =>
  `http://${host || LOCAL_HOST}${location || ''}`;
// const url = 'http://127.0.0.1:5050/stage';
const POLL_START = 'start';
const POLL_STOP = 'end';

function* fetchStage() {
  while (true) {
    const url = getUrl({ location: 'stage' });
    const data = yield fetch(url, {
      method: 'GET'
    }).then(response => response.json());
    console.log(data);

    yield delay(1000);
  }
}

function* actionWatcher() {
  while (true) {
    yield take(POLL_START);
    yield race([call(fetchStage), take(POLL_STOP)]);
  }
}

function* startCalibrationSage({ host }) {
  let countdown = 6;
  delay(2000);
  while (countdown) {
    yield delay(1000);
    countdown -= 1;
    yield put(setCalibrationCountdown(countdown));
  }
  const url = getUrl({ host, location: '/calibration' });
  try {
    yield fetch(url, { method: 'PUT' });
    yield put(gotoHome());
  } catch (exception) {
    console.error('Processing server error');
  }
}

function* tryConnectSaga({ payload }) {
  if (_isEmpty(payload)) {
    yield put(saveInput(LOCAL_HOST));
  }
  yield put(setConnecting(true));
  const url = getUrl({ host: payload });
  try {
    const data = yield fetch(url, {
      method: 'GET'
    }).then(response => response.json());
    yield put(setConnecting(false));

    if (data.id === PROCESSOR_ID) {
      yield put(setVerified(true));
      yield call(startCalibrationSage, { host: payload });
    } else {
      yield put(setVerified(false));
    }
  } catch (exception) {
    yield put(setVerified(false));
  }
}

function* tryConnectWatcher() {
  yield takeLatest(TRY_CONNECT, tryConnectSaga);
}

/**
 * Programmatically jump example
 */
function* redirectSaga({ payload }) {
  yield call(history.push, payload);
}

function* redirectWatcher() {
  yield takeLatest(REDIRECT, redirectSaga);
}

export default function* rootSaga() {
  yield all([actionWatcher(), redirectWatcher(), tryConnectWatcher()]);
}
