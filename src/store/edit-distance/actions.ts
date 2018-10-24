import { action } from 'typesafe-actions';
import { ActionTypes } from './types';

export const refresh = () => action(ActionTypes.REFRESH_CLICK);
export const closeDialog = () => action(ActionTypes.CLOSE_DIALOG_CLICK);
export const openDialog = () => action(ActionTypes.OPEN_DIALOG_CLICK);
export const buttonClick = (data: number | string) => action(ActionTypes.BUTTON_CLICK, data);
export const fetchSuccess = (data: any) => action(ActionTypes.RECEIVED_RECORD, data);
export const increaseSuccess = () => action(ActionTypes.INCREASE_RECORD);
