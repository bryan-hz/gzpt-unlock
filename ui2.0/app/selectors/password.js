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
export const selectShowIncorrect = createSelector(
  // TODO: the props show be different from incorrect and correct after reentering?
  selectPasswordDomain,
  substate => substate.showIncorrect
);
