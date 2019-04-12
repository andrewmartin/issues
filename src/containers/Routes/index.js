import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from 'containers/Login';

export default () => (
  <Switch>
    <Route component={Login} path="/" />
  </Switch>
);
