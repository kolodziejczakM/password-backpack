import { combineReducers } from 'redux';
import dashboard from './dashboardReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  dashboard,
  ajaxCallsInProgress,
});

export default rootReducer;
