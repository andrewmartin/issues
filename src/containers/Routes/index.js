import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginContainer from 'containers/Login';
import ReposContainer from 'containers/Repos';
import IssuesContainer from 'containers/Issues';

import LoggedInRoute from './LoggedInRoute';

export default () => (
  <Switch>
    <Route component={LoginContainer} exact path="/" />
    <LoggedInRoute component={ReposContainer} exact path="/repos" />
    <LoggedInRoute component={IssuesContainer} exact path="/repos/:owner/issues/:name" />
  </Switch>
);
