import { createSelector } from 'reselect';

const selectPasswordDomain = state => state.password;

export const selectShowReenter = createSelector(
  selectPasswordDomain,
  substate => substate.showReenter
);
