import { createSelector } from 'reselect';

const selectLoginInstrDomain = state => state.loginInstruction;

export const selectActivateGoBackButton = createSelector(
  selectLoginInstrDomain,
  substate => substate.activateGoBackButton
);

export const selectActivateReadyButton = createSelector(
  selectLoginInstrDomain,
  substate => substate.activateReadyButton
);
