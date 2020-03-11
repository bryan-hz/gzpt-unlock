import { createSelector } from 'reselect';

const selectPasswordDomain = state => state.password;

export const selectShowReenter = createSelector(
  selectPasswordDomain,
  substate => substate.showReenter
);

export const selectNextPenaltyTime = createSelector(
  selectPasswordDomain,
  substate => substate.nextPenaltyTime
);

export const selectRemainingTrials = createSelector(
  selectPasswordDomain,
  substate => substate.remainingTrials
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
