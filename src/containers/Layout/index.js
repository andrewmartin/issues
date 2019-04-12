import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from 'components/Header';

import { actions as userActions } from 'reducers/user/user';

export class Layout extends Component {
  render() {
    const { children, actions, user } = this.props;

    return (
      <>
        <Header actions={actions} user={user} />
        {children}
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...userActions,
    },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
