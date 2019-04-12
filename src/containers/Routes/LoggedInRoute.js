import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import AppLayout from 'containers/Layout';

const LoggedInRoute = props => {
  const {
    user: { id },
  } = props;

  if (id) {
    return (
      <AppLayout>
        <Route {...props} />;
      </AppLayout>
    );
  }

  return <Redirect to={{ pathname: '/' }} />;
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(LoggedInRoute);
