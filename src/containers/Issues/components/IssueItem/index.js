import React, { Component } from 'react';

import styles from './IssueItem.module.scss';

export default class IssueItem extends Component {
  render() {
    const { title, open_issues_count, onClick } = this.props;
    return (
      <button className={styles.item} onClick={onClick} type="button">
        {title}
        <span className={styles.badge}>{open_issues_count} issues</span>
      </button>
    );
  }
}
