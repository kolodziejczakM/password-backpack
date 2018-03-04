import * as types from '../actions/actionTypes';

export default function dashboardReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_TEXT:
      return [...state, action.text];
    default: return state;
  }
}
