import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DashboardPage from './components/dashboard-page/DashboardPage';
import CreateNewPage from './components/create-new-page/CreateNewPage';

export default (
  <Switch>
    <Route exact path="/" component={DashboardPage} />
    <Route exact path="/form" component={CreateNewPage} />
  </Switch>
);
