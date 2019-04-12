import React, { Component } from 'react';

import styles from './Header.module.scss';

export default class Header extends Component {
  onLogout = () => {
    const {
      actions: { logoutUser },
    } = this.props;

    logoutUser();
  };

  render() {
    const { user } = this.props;

    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <h1>Issues</h1>
          {user && user.id && (
            <button className={styles.button} onClick={this.onLogout} type="button">
              Logout
            </button>
          )}
        </div>
      </header>
    );
  }
}
