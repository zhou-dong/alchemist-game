import { action } from 'typesafe-actions';
import { ActionTypes } from './types';

export const refresh = () => action(ActionTypes.REFRESH_CLICK);
export const closeModal = () => action(ActionTypes.CLOSE_MODAL_CLICK);
export const openModal = () => action(ActionTypes.OPEN_MODAL_CLICK);
export const buttonClick = (data: number | string) => action(ActionTypes.BUTTON_CLICK, data);
export const fetchSuccess = (data: any) => action(ActionTypes.RECEIVED_RECORD, data);
