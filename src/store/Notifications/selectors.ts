import { AppState } from '~/store/types';

export const selectNotificationsAllowed = (state: AppState) => state.notifications.allowed;
