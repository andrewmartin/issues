import { createAction, handleActions } from 'redux-actions';

import { parseError } from 'store/helpers';

const fetchUserStart = createAction('repo/FETCH_START');
const getRepoSuccess = createAction('repo/FETCH_USER');
const userError = createAction('repo/ERROR');

export const actions = {
  getRepos: () => async (dispatch, state, { api }) => {
    dispatch(fetchUserStart());
    const { token } = state().user;

    try {
      const data = await api.get('/user', {
        params: { access_token: token },
      });
      return dispatch(getRepoSuccess(data));
    } catch (error) {
      return dispatch(
        userError({
          error,
        })
      );
    }
  },
};

export const defaultState = {
  isLoading: false,
  serverError: null,
  token: null,
};

export default handleActions(
  {
    [fetchUserStart]: {
      next: state => {
        return {
          ...state,
          isLoading: true,
          serverError: null,
        };
      },
    },
    [getRepoSuccess]: {
      next: (state, { payload: { data } }) => {
        return {
          ...state,
          isLoading: false,
          serverError: null,
          ...data,
        };
      },
    },
    [userError]: {
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
