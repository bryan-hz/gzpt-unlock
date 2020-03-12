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
import _toInteger from 'lodash/toInteger';
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
  gotoPassword,
  gotoRegistered,
  gotoComplete
} from 'actions/redirect';
import {
  showReenter,
  hideReenter,
  showIncorrect,
  hideIncorrect,
  showCorrect,
  hideCorrect,
  showMismatch,
  hideMismatch,
  setInputs,
  setIncorrectParam
} from '../actions/password';
import {
  activateGoBackButton,
  deactivateGoBackButton,
  activateReadyButton,
  deactivateReadyButton
} from '../actions/instruction';
import { setLoadingLogin, setLoadingReset } from '../actions/home';

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
        if (nextStage === 'register_instruction') {
          yield put(setLoadingReset(true));
          yield delay(transitionDelay * 1000);
          yield put(gotoRegisterInstruction());
          yield put(setLoadingReset(false));
        } else {
          yield put(setLoadingLogin(true));
          yield delay(transitionDelay * 1000);
          yield put(gotoLoginInstruction());
          yield put(setLoadingLogin(false));
        }
      }
      break;
    case 'register_instruction':
    case 'login_instruction': {
      if (!_isEmpty(nextStage)) {
        if (nextStage === 'home') {
          yield put(activateGoBackButton());
          yield delay(transitionDelay * 1000);
          yield put(deactivateGoBackButton());
          yield put(gotoHome());
        } else {
          yield put(activateReadyButton());
          yield delay(transitionDelay * 1000);
          yield put(deactivateReadyButton());
          yield put(gotoPassword());
        }
      }
      break;
    }
    case 'register_input_phase_one': {
      const { buttons, links } = params;
      yield put(setInputs({ buttons, links }));
      if (transitionDelay !== 0) {
        yield put(showReenter());
        yield delay(transitionDelay * 1000);
        yield put(hideReenter());
      }
      break;
    }
    case 'register_input_phase_two': {
      const { buttons, links } = params;
      yield put(setInputs({ buttons, links }));
      if (nextStage === 'register_input_phase_one') {
        if (transitionDelay !== 0) {
          yield put(showMismatch());
          yield delay(transitionDelay * 1000);
          yield put(hideMismatch());
        }
      } else if (transitionDelay !== 0) {
        yield put(gotoRegistered());
        yield delay(transitionDelay * 1000);
        yield put(gotoComplete());
      }
      break;
    }
    case 'complete': {
      if (!_isEmpty(nextStage)) {
        yield delay(transitionDelay * 1000);
        yield put(gotoHome());
      }
      break;
    }
    case 'login_input': {
      const { buttons, links, remainingTrials, nextPenaltyTime } = params;
      yield put(setInputs({ buttons, links }));

      const penaltyTime = remainingTrials ? nextPenaltyTime : transitionDelay;
      yield put(
        setIncorrectParam({
          remainingTrials,
          nextPenaltyTime: _toInteger(penaltyTime)
        })
      );

      if (nextStage === 'login_input') {
        yield put(showIncorrect());
      }

      if (transitionDelay < 1) {
        yield delay(transitionDelay * 1000);
        yield put(hideIncorrect());
      }

      if (nextStage === 'complete') {
        yield put(showCorrect());
        yield delay(transitionDelay * 1000);
        yield put(hideCorrect());
        yield put(gotoComplete());
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
