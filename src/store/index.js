import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createWhitelistFilter } from 'redux-persist-transform-filter';

import api from 'api';
import { createBrowserHistory } from 'history';
import rootReducer from 'reducers';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

export const history = createBrowserHistory();

export default () => {
  const initialState = {};
  const enhancers = [];
  const middleware = [thunk.withExtraArgument(api), routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-underscore-dangle
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const persistConfig = {
    key: 'issues',
    storage,
    blacklist: ['issues', 'repo'],
    transforms: [createWhitelistFilter('user'), createWhitelistFilter('issue', ['order'])],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer(history));
  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  const store = createStore(persistedReducer, initialState, composedEnhancers);
  const persistor = persistStore(store);

  return { store, persistor };
};
