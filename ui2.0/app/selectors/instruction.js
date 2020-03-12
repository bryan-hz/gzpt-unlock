import { createSelector } from 'reselect';

const selectInstrDomain = state => state.instruction;

export const selectActivateGoBackButton = createSelector(
  selectInstrDomain,
  substate => substate.activateGoBackButton
);

export const selectActivateReadyButton = createSelector(
  selectInstrDomain,
  substate => substate.activateReadyButton
);
