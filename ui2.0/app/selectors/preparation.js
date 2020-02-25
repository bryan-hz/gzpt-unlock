import { createSelector } from 'reselect';

const selectPreparationDomain = state => state.preparation;

// eslint-disable-next-line import/prefer-default-export
export const selectProcessorAddress = createSelector(
  selectPreparationDomain,
  substate => substate.processorAddress
);
