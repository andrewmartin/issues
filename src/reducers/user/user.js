import { createAction, handleActions } from 'redux-actions';

import { parseError } from 'store/helpers';

const fetchUserStart = createAction('user/FETCH_START');
const setUserToken = createAction('user/SET_TOKEN');
const getUserSuccess = createAction('user/FETCH_USER');
const userError = createAction('user/ERROR');

export const actions = {
  setToken: token => dispatch => dispatch(setUserToken(token)),

  getUser: () => async (dispatch, state, { api }) => {
    dispatch(fetchUserStart());
    const { token } = state().user;

    try {
      const data = await api.get('/user', {
        params: { access_token: token },
      });
      return dispatch(getUserSuccess(data));
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
    [setUserToken]: {
      next: (state, { payload }) => {
        return {
          ...state,
          token: payload,
        };
      },
    },
    [getUserSuccess]: {
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
