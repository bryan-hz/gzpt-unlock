import { createSelector } from 'reselect';

const selectPasswordDomain = state => state.password;

export const selectShowReenter = createSelector(
  selectPasswordDomain,
  substate => substate.showReenter
);
export const selectShowIncorrect = createSelector(
  selectPasswordDomain,
  substate => substate.showIncorrect
);

export const selectShowCorrect = createSelector(
  selectPasswordDomain,
  substate => substate.showCorrect
);

export const selectShowMismatch = createSelector(
  selectPasswordDomain,
  substate => substate.showMismatch
);

export const selectActiveButtons = createSelector(
  selectPasswordDomain,
  substate => substate.activeButtons
);

export const selectActiveLinks = createSelector(
  selectPasswordDomain,
  substate => substate.activeLinks
);
