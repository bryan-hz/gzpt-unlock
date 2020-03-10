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
import {
  gotoHome,
  gotoRegisterInstruction,
  gotoLoginInstruction,
  gotoPassword
} from 'actions/redirect';
import { showReenter, hideReenter, setInputs } from '../actions/password';

const getUrl = ({ host, location }) =>
  `http://${host || LOCAL_HOST}:5050${location || ''}`;

const DISCONNECT = 'SAGA/ACTION/DISCONNECT_PROCESSOR';

function* updateStageSaga({
  currentStage,
  nextStage,
  transitionDelay,
  params
}) {
  switch (currentStage) {
    case 'home':
      if (!_isEmpty(nextStage)) {
        yield delay(transitionDelay * 1000);
        if (nextStage === 'register_instruction') {
          yield put(gotoRegisterInstruction());
        } else {
          yield put(gotoLoginInstruction());
        }
      }
      break;
    // TODO: Add more cases
    case 'register_instruction':
    case 'login_instruction': {
      if (!_isEmpty(nextStage)) {
        yield delay(transitionDelay * 1000);
        if (nextStage === 'home') {
          yield put(gotoHome());
        } else {
          yield put(gotoPassword());
        }
      }
      break;
    }
    case 'register_input_phase_one': {
      if (_isEmpty(nextStage)) {
        const { buttons, links } = params;
        yield put(setInputs({ buttons, links }));
      } else if (transitionDelay !== 0) {
        yield put(showReenter());
      } else {
        yield put(hideReenter());
        const { buttons, links } = [];
        yield put(setInputs({ buttons, links }));
      }
      break;
    }
    case 'register_input_phase_two': {
      if (_isEmpty(nextStage)) {
        const { buttons, links } = params;
        yield put(setInputs({ buttons, links }));
      } else {
        // TODO:
        // If match, display registered page
        // If mismatch, prompt mismatch and go to phase one
      }
      break;
    }
    case 'complete': {
      // yield put(DISCONNECT);
      if (!_isEmpty(nextStage)) {
        yield delay(transitionDelay * 1000);
        if (nextStage === 'home') {
          yield put(gotoHome());
        } else {
          yield put(gotoPassword());
        }
      }
      break;
    }
    case 'login_input': {
      if (_isEmpty(nextStage)) {
        const { buttons, links } = params;
        yield put(setInputs({ buttons, links }));
      } else {
        // TODO:
        // If correct, display correct prompt and go to complete
        // If incorrect, display incorrect prompt with either num of tries left or unlock time
        //    - clear all buttons and links
      }
      break;
    }
    default:
      break;
  }
}

function* checkStageLoop({ host }) {
  while (true) {
    const url = getUrl({ host, location: '/stage' });
    const data = yield fetch(url, {
      method: 'GET'
    }).then(response => response.json());
    console.log(data);

    yield call(updateStageSaga, data);

    yield delay(300);
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
  yield race([call(checkStageLoop, { host }), take(DISCONNECT)]);
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
    console.error(exception);
    yield put(setConnecting(false));
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
  yield all([redirectWatcher(), tryConnectWatcher()]);
}
