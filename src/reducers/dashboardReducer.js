import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function dashboardReducer(state = initialState.dashboard, action) {
  switch (action.type) {
    case types.CREATE_TEXT:
      return [...state, action.text];
    case types.LOAD_MY_IP_SUCCESS: // should be in different reducer and just return action.data
      return [...state, action.data];
    default: return state;
  }
}
