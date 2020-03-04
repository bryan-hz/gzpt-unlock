import { REDIRECT } from 'constants/redirect';
import routes from 'constants/routes.json';

export const gotoPreparation = () => ({
  type: REDIRECT,
  payload: routes.PREPARATION
});

export const gotoHome = () => ({
  type: REDIRECT,
  payload: routes.HOME
});

export const gotoRegisterInstruction = () => ({
  type: REDIRECT,
  payload: routes.REGISTER_INSTRUCTION
});

export const gotoPassword = () => ({
  type: REDIRECT,
  payload: routes.PASSWORD_ENTRY
});
