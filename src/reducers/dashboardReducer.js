import * as types from '../actions/actionTypes';

export default function dashboardReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_TEXT:
      return [...state, action.text];
    case types.LOAD_MY_IP_SUCCESS: // should be in different reducer and just return action.data
      return [...state, action.data];
    default: return state;
  }
}
