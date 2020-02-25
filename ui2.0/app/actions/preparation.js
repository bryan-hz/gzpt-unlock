import { SAVE_INPUT } from 'constants/preparation';

// eslint-disable-next-line import/prefer-default-export
export const saveInput = payload => ({
  type: SAVE_INPUT,
  payload
});
