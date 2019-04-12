import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput } from 'components/Forms';

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
    const { apiKey } = this.state;

    console.log('apiKey', apiKey);
  };

  render() {
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
          </form>
        </div>
      </main>
    );
  }
}

export default connect()(Login);
