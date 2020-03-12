import { createSelector } from 'reselect';

const selectCompleteDomain = state => state.complete;

// eslint-disable-next-line import/prefer-default-export
export const selectActivateLogoutButton = createSelector(
  selectCompleteDomain,
  substate => substate.activateLogoutButton
);
