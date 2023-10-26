import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '~/store/types';

export const selectToastsItems = (state: AppState) => state.toasts.toasts;

export const selectLastToastsItem = createSelector([selectToastsItems], (items) => {
  return items[items.length - 1] || null;
});

export const selectAllExceptLastFiveToastItemsIds = createSelector([selectToastsItems], (items) => {
  return items.slice(0, -5).map(({ id }) => id);
});
