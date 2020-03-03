import { createSelector } from 'reselect';

const selectPreparationDomain = state => state.preparation;

export const selectProcessorAddress = createSelector(
  selectPreparationDomain,
  substate => substate.processorAddress
);

export const selectConnecting = createSelector(
  selectPreparationDomain,
  substate => substate.connecting
);

export const selectVerified = createSelector(
  selectPreparationDomain,
  substate => substate.verified
);

export const selectCalibrationCountdown = createSelector(
  selectPreparationDomain,
  substate => substate.calibrationCountdown
);
