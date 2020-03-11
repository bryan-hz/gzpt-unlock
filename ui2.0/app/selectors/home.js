import { createSelector } from 'reselect';

const selectHomeDomain = state => state.home;

export const selectLoadingLogin = createSelector(
  selectHomeDomain,
  substate => substate.loadingLogin
);

export const selectLoadingReset = createSelector(
  selectHomeDomain,
  substate => substate.loadingReset
);
