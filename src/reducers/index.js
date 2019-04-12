import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import user from 'reducers/user/user';
import repo from 'reducers/repo/repo';
import issue from 'reducers/issue/issue';

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    repo,
    issue,
  });
