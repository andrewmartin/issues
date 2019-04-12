import { createAction, handleActions } from 'redux-actions';

import { parseError } from 'store/helpers';

export const fetchIssueStart = createAction('issue/FETCH_START');
export const getIssuesSuccess = createAction('issue/FETCH_ISSUES');
export const setOrder = createAction('issue/SET_ORDER');
export const resetOrder = createAction('issue/RESET_ORDER');
export const issueError = createAction('issue/ERROR');

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
        issueError({
          error,
        })
      );
    }
  },

  setOrder: ({ name, issues }) => dispatch => dispatch(setOrder({ name, issues })),

  resetOrder: ({ name }) => dispatch => dispatch(resetOrder({ name })),
};

export const defaultState = {
  isLoading: false,
  serverError: null,
  items: [],
  order: {},
};

// takes and array of sorted issues,
// then sets the issue order key based on the id of the item.
// For example: [{id: 4}, {id: 1}] => { 4: 0, 1: 1 };
const setIssueOrder = issues =>
  issues
    .map((issue, index) => ({
      [issue.id]: index,
    }))
    .reduce((acc, item) => ({
      ...acc,
      ...item,
    }));

// removes the order key (to reset the order value altogether)
const removeOrder = (state, name) => {
  const newState = Object.assign({}, state, {});
  delete newState[name];
  return newState;
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
    [issueError]: {
      next: (_state, { payload: { error } }) => {
        return {
          isLoading: false,
          serverError: parseError(error),
        };
      },
    },
    [setOrder]: {
      next: (state, { payload: { name, issues } }) => {
        return {
          ...state,
          order: {
            ...state.order,
            [name]: setIssueOrder(issues),
          },
        };
      },
    },
    [resetOrder]: {
      next: (state, { payload: { name } }) => {
        return {
          ...state,
          order: removeOrder(state.order, name),
        };
      },
    },
  },

  defaultState
);
