import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { actions as repoActions } from 'reducers/repo/repo';
import Error from 'components/Error';
import RepoItem from './components/RepoItem';

import styles from './Repos.module.scss';

export class Repos extends Component {
  componentDidMount() {
    const {
      actions: { getRepos },
    } = this.props;

    getRepos();
  }

  render() {
    const {
      goToRepo,
      repo: { serverError, items },
    } = this.props;

    return (
      <div className={styles.container}>
        <h2 className={styles.pageTitle}>Repositories</h2>
        {items
          .sort((a, b) => (a.open_issues_count > b.open_issues_count ? -1 : 0))
          .map(item => (
            <RepoItem key={item.id} onClick={() => goToRepo(item.id)} {...item} />
          ))}
        <Error error={serverError} />
      </div>
    );
  }
}

const mapStateToProps = ({ repo }) => ({
  repo,
});

const mapDispatchToProps = dispatch => ({
  goToRepo: id => dispatch(push(`/repos/${id}`)),
  actions: bindActionCreators(
    {
      ...repoActions,
    },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repos);
