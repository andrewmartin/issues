import React, { Component } from 'react';
import cx from 'classnames';

import styles from './RepoItem.module.scss';

export default class RepoItem extends Component {
  render() {
    const { isEmpty, className, name, open_issues_count, onClick } = this.props;
    return (
      <button
        className={cx(styles.item, {
          [className]: className,
          [styles.isEmpty]: isEmpty,
        })}
        onClick={onClick}
        type="button">
        {name}
        <span className={styles.badge}>{open_issues_count} issues</span>
      </button>
    );
  }
}
