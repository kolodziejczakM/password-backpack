import * as types from './actionTypes';
import { getMyIp } from '../api/dashboardApi';

export function createText(text) {
  return { type: types.CREATE_TEXT, text };
}

export function loadMyIpSuccess(data) {
  return { type: types.LOAD_MY_IP_SUCCESS, data };
}

export function loadMyIp() {
  return dispatch => (
    getMyIp()
      .then(res => res.json())
      .then(data => dispatch(loadMyIpSuccess(data)))
      .catch(err => console.log(err))
  );
}
