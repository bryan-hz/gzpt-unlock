import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import preparation from './preparation';
import home from './home';
import password from './password';
import loginInstruction from './loginInstruction';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    preparation,
    password,
    loginInstruction,
    home
  });
}
