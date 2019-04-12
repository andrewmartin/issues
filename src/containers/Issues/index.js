import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectIssues } from 'selectors/issue';
import { actions as repoActions } from 'reducers/repo/repo';
import { actions as issueActions } from 'reducers/issue/issue';
import SideNav from 'components/SideNav';
import Error from 'components/Error';

import DraggableIssues from './components/DraggableIssues';
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

  onSetOrder = issues => {
    const {
      match: {
        params: { name },
      },
      actions: { setOrder },
    } = this.props;

    setOrder({ name, issues });
  };

  render() {
    const {
      actions: { resetOrder },
      match: {
        params: { name },
      },
      issue,
      issues,
      repo: { items: repoItems },
      issue: { serverError },
    } = this.props;

    const hasSetOrder = issue.order[name];

    return (
      <div className={styles.container}>
        <SideNav items={repoItems} />
        <main className={styles.main}>
          <h2 className={styles.pageTitle}>
            Issues for <code className={styles.code}>{name}</code>
          </h2>
          <p className={styles.hint}>Hint: Drag the issues to reorder them.</p>
          {issues.length ? (
            <DraggableIssues
              items={issues}
              onReset={hasSetOrder ? () => resetOrder({ name }) : null}
              onSetOrder={this.onSetOrder}
            />
          ) : (
            <p>No issues found.</p>
          )}
          <Error error={serverError} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { name },
    },
  } = ownProps;

  return {
    repo: state.repo,
    issue: state.issue,
    issues: selectIssues(state, name),
  };
};

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
