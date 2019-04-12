import React, { Component } from 'react';
import { withRouter } from 'react-router';
import RepoItem from 'components/RepoItem';

import styles from './SideNav.module.scss';

class SideNav extends Component {
  goToRepo = item => {
    const { history } = this.props;
    const {
      name,
      owner: { login },
    } = item;
    history.push(`/repos/${login}/issues/${name}`);
  };

  render() {
    const { items, history } = this.props;

    return (
      <aside className={styles.container}>
        <h3>Repositories</h3>
        {items
          .sort((a, b) => (a.open_issues_count > b.open_issues_count ? -1 : 0))
          .slice(0, 15)
          .map(item => (
            <RepoItem
              key={item.id}
              className={styles.repoItem}
              isEmpty={item.open_issues_count < 1}
              onClick={() => this.goToRepo(item)}
              {...item}
            />
          ))}
        <button className={styles.viewAll} onClick={() => history.push('/repos')} type="button">
          View All
        </button>
      </aside>
    );
  }
}

export default withRouter(SideNav);
