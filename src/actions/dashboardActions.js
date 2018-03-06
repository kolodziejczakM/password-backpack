import * as types from './actionTypes';
import { getMyIp } from '../api/dashboardApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function createText(text) {
  return { type: types.CREATE_TEXT, text };
}

export function loadMyIpSuccess(data) {
  return { type: types.LOAD_MY_IP_SUCCESS, data };
}

export function loadMyIp() {
  return function dispatched(dispatch) {
    dispatch(beginAjaxCall());
    return getMyIp()
      .then(res => res.json())
      .then(data => dispatch(loadMyIpSuccess(data)))
      .catch((err) => {
        dispatch(ajaxCallError());
        throw err;
      });
  };
}
