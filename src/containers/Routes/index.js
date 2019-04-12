import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginContainer from 'containers/Login';
import ReposContainer from 'containers/Repos';

import LoggedInRoute from './LoggedInRoute';

export default () => (
  <Switch>
    <Route component={LoginContainer} exact path="/" />
    <LoggedInRoute component={ReposContainer} exact path="/repos" />
  </Switch>
);
