import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TextInput } from 'components/Forms';
import { actions as userActions } from 'reducers/user/user';
import Error from 'components/Error';

import styles from './Login.module.scss';

class Login extends Component {
  state = {
    apiKey: '',
  };

  onInputChange = value => {
    this.setState({
      apiKey: value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      actions: { setToken, getUser },
    } = this.props;
    const { apiKey } = this.state;
    setToken(apiKey);
    getUser();
  };

  render() {
    const {
      user: { serverError },
    } = this.props;

    return (
      <main className={styles.layout}>
        <div className={styles.container}>
          <h2>Login</h2>
          <form className={styles.form} onSubmit={this.onSubmit}>
            <TextInput
              className={styles.input}
              onChange={this.onInputChange}
              placeholder="Your Github API Key"
              required
            />
            <button className={styles.button} type="submit">
              Submit
            </button>
            <Error error={serverError} />
          </form>
        </div>
      </main>
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
)(Login);
