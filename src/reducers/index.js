import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import user from 'reducers/user/user';
import repo from 'reducers/repo/repo';

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    repo,
  });
