import {
  // eslint-disable-next-line no-unused-vars
  select,
  race,
  all,
  call,
  take,
  delay,
  takeLatest
} from 'redux-saga/effects';
import { REDIRECT } from 'constants/redirect';
import { history } from '../store/configureStore';

const url = 'http://127.0.0.1:5050/stage';
const POLL_START = 'start';
const POLL_STOP = 'end';

function* fetchStage() {
  while (true) {
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
  yield all([actionWatcher(), redirectWatcher()]);
}
