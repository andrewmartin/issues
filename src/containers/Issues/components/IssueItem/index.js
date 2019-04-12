import React, { Component } from 'react';
import moment from 'moment';
import styles from './IssueItem.module.scss';

export default class IssueItem extends Component {
  render() {
    const { id, title, created_at, updated_at, assignee } = this.props;
    return (
      <div className={styles.item}>
        {assignee && <img alt={assignee.login} className={styles.img} src={assignee.avatar_url} />}
        <div className={styles.content}>
          {title}
          {id}
          <span className={styles.date}>{moment(created_at).format('MM/DD/YYYY')}</span>
        </div>
        <span className={styles.updated}>{moment(updated_at).fromNow()}</span>
      </div>
    );
  }
}
