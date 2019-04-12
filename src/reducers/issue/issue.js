import { createAction, handleActions } from 'redux-actions';

import { parseError } from 'store/helpers';

const fetchIssueStart = createAction('issue/FETCH_START');
const getIssuesSuccess = createAction('issue/FETCH_ISSUES');
const repoError = createAction('issue/ERROR');

export const actions = {
  getIssues: ({ owner, name }) => async (dispatch, state, { api }) => {
    dispatch(fetchIssueStart());
    const { token } = state().user;

    try {
      const data = await api.get(`/repos/${owner}/${name}/issues`, {
        params: { access_token: token },
      });
      return dispatch(getIssuesSuccess(data));
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
    [fetchIssueStart]: {
      next: state => {
        return {
          ...state,
          isLoading: true,
          serverError: null,
        };
      },
    },
    [getIssuesSuccess]: {
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
