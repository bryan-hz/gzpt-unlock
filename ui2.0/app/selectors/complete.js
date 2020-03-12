import { createSelector } from 'reselect';

const selectCompleteDomain = state => state.complete;

const selectActivateLogoutButton = createSelector(
  selectCompleteDomain,
  substate => substate.activateLogoutButton
);

export default selectActivateLogoutButton;
