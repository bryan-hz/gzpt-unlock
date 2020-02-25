import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const saga = createSagaMiddleware();
const enhancer = applyMiddleware(thunk, router, saga);

function configureStore(initialState) {
  return {
    ...createStore(rootReducer, initialState, enhancer),
    runSaga: saga.run
  };
}

export default { configureStore, history };
