import React, { Component } from 'react';

import styles from './RepoItem.module.scss';

export default class RepoItem extends Component {
  render() {
    const { name, open_issues_count, onClick } = this.props;
    return (
      <button className={styles.item} onClick={onClick} type="button">
        {name}
        <span className={styles.badge}>{open_issues_count} issues</span>
      </button>
    );
  }
}
