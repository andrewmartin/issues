import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TextInput } from 'components/Forms';
import { actions as userActions } from 'reducers/user/user';
import Error from 'components/Error';

import styles from './Login.module.scss';

export class Login extends Component {
  state = {
    apiKey: '',
  };

  componentDidMount() {
    const {
      onLogin,
      user: { id },
    } = this.props;
    if (id) return onLogin();
    return null;
  }

  componentDidUpdate(prevProps) {
    const {
      onLogin,
      user: { id },
    } = this.props;

    if (id !== prevProps.user.id && id) {
      onLogin();
    }
  }

  onInputChange = value => {
    this.setState({
      apiKey: value,
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const {
      actions: { setToken, getUser },
    } = this.props;
    const { apiKey } = this.state;
    setToken(apiKey);

    try {
      await getUser();
    } catch (err) {
      this.setState({
        apiKey: '',
      });
    }
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
  onLogin: () => dispatch(push('/repos')),
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
