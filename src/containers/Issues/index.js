import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as repoActions } from 'reducers/repo/repo';
import { actions as issueActions } from 'reducers/issue/issue';

import SideNav from 'components/SideNav';
import Error from 'components/Error';

import IssueItem from './components/IssueItem';
import styles from './Issues.module.scss';

export class Issues extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params },
    } = this.props;

    if (params !== prevProps.match.params) this.fetchData();
  }

  fetchData = () => {
    const {
      repo,
      actions: { getIssues, getRepos },
      match: {
        params: { name, owner },
      },
    } = this.props;

    if (!repo.items.length) getRepos();
    getIssues({ name, owner });
  };

  render() {
    const {
      repo: { items: repoItems },
      issue: { serverError, items },
    } = this.props;

    return (
      <div className={styles.container}>
        <SideNav items={repoItems} />
        <main className={styles.main}>
          <h2 className={styles.pageTitle}>Issues</h2>
          {items
            .sort((a, b) => (a.open_issues_count > b.open_issues_count ? -1 : 0))
            .map(item => (
              <IssueItem key={item.id} {...item} />
            ))}
          <Error error={serverError} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ repo, issue }) => ({
  repo,
  issue,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...repoActions,
      ...issueActions,
    },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Issues);
