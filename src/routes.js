import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DashboardPage from './components/dashboard/DashboardPage';
import AboutPage from './components/about/AboutPage';

export default (
  <Switch>
    <Route exact path="/" component={DashboardPage} /> 
    <Route exact path="/about" component={AboutPage}/>
  </Switch>
);
