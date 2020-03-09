import { createSelector } from 'reselect';

const selectPasswordDomain = state => state.password;

export const selectShowReenter = createSelector(
  selectPasswordDomain,
  substate => substate.showReenter
);

export const selectActiveButtons = createSelector(
  selectPasswordDomain,
  substate => substate.activeButtons
);

export const selectActiveLinks = createSelector(
  selectPasswordDomain,
  substate => substate.activeLinks
);
