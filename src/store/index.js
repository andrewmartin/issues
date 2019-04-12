import { applyMiddleware, compose, createStore } from 'redux';
import api from 'api';
import { createBrowserHistory } from 'history';
import rootReducer from 'reducers';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

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

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export default createStore(rootReducer(history), initialState, composedEnhancers);
