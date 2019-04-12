import { createAction, handleActions } from 'redux-actions';

const fetchUserStart = createAction('user/FETCH_START');
const setUserToken = createAction('user/SET_TOKEN');
const getUserSuccess = createAction('user/FETCH_USER');
const userError = createAction('user/ERROR');

export const actions = {
  setToken: token => dispatch => dispatch(setUserToken(token)),

  getUser: () => async (dispatch, _state, { api }) => {
    dispatch(fetchUserStart());
    try {
      const data = await api.get('/tasks');
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
  },

  defaultState
);
