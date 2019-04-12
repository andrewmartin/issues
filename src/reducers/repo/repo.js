import { createAction, handleActions } from 'redux-actions';

import { parseError } from 'store/helpers';

const fetchRepoStart = createAction('repo/FETCH_START');
const getReposSuccess = createAction('repo/FETCH_REPOS');
const repoError = createAction('repo/ERROR');

export const actions = {
  getRepos: () => async (dispatch, state, { api }) => {
    dispatch(fetchRepoStart());
    const { token } = state().user;

    try {
      const data = await api.get('/user/repos', {
        params: { access_token: token },
      });
      return dispatch(getReposSuccess(data));
    } catch (error) {
      return dispatch(
        repoError({
          error,
        })
      );
    }
  },
};

export const defaultState = {
  isLoading: false,
  serverError: null,
  items: [],
};

export default handleActions(
  {
    [fetchRepoStart]: {
      next: state => {
        return {
          ...state,
          isLoading: true,
          serverError: null,
        };
      },
    },
    [getReposSuccess]: {
      next: (state, { payload: { data } }) => {
        return {
          ...state,
          isLoading: false,
          serverError: null,
          items: data,
        };
      },
    },
    [repoError]: {
      next: (_state, { payload: { error } }) => {
        return {
          isLoading: false,
          serverError: parseError(error),
        };
      },
    },
  },

  defaultState
);
