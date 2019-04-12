import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const LoggedInRoute = props => {
  const {
    user: { id },
  } = props;

  if (id) {
    return <Route {...props} />;
  }

  return <Redirect to={{ pathname: '/' }} />;
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(LoggedInRoute);
