# Github Sort Issues

This is an example project that showcases React/Redux to sort Github issues.

[View Demo](http://am-issues.s3-website-us-west-1.amazonaws.com)

Goals of the application:

1. Provide interface to login with `apiKey`
2. Save apiKey into localstorage (to allow subsequent visits without re-logging in)
3. Fetch repositories of current user
4. See issues related to each repository
5. Set a custom order of issues (and fallback to default order)
6. Persist said order to local browser storage

## Quickstart

1. Grab a [Github API personal access token](https://github.com/settings/tokens)
2. Copy the token to your clipboard
3. `yarn` and `yarn start`
4. Login with your given token.
5. On Github, make sure you have at least one repository with at least 2 issues to properly showcase the application demo.

## Developer Quickstart

1. Copy `.env-example` to `.env` in the project root, updating parameters if necessary.
2. `yarn`
3. `yarn start`

## Tests

1. `yarn test`

### Application Structure

This is a high level view of the notable files and directories in this application:

```
├── .eslintrc.js -> custom eslint config
├── .env -> app environment
├── .prettierrc -> prettier config
├── api -> api singleton (uses `axios`)
├── components -> shared components
├── containers -> app containers
├── index.js -> app entry and render call
├── index.scss -> global styles (mostly resets)
├── reducers -> application redux reducers (and action creators)
├── selectors -> redux store selectors
├── store -> redux store configuration and helpers
└── styles -> shared styles
```

The general pattern held here is that those files in `containers` will hold the `mapStateToProps` assignments only, and pass down to other containers.

#### A brief walk through

We have top level keys to store the data for the `user`, `repo`, and `issue` items, which in turn tend to correspond to an API resource.

The most complex area of this application is likely in the `onSetOrder` action creator found in the `reducers/issue`. This action creator takes an array of sorted items (provided by `react-beautiful-dnd`'s callback and a simple function to rearrange the items) and modifies the reducer to apply an order based on the `name` of the repo.

For example:

```js
dispatch(setOrder({
  name: 'some-repo',
  issues: [{
    id: 123
    ...
  }, {
    id: 252
    ...
  }])
})
```

...will modify the `issue` reducer to something like:

```js
state.issue.order = {
  'some-repo': {
    123: 0,
    252: 1
  }
}
```

In turn we have a [selector](./src/selectors/index.js) that will iterate through these key based values and return its proper sort order:

```js
// sortIssues selector
...
return state.issue.order[name][a.id] < state.issue.order[name][b.id] ? -1 : 1;
...
```

This is one of the more notably complex behaviors in this project.

##### Roadmap

- [ ] More robust selectors
- [ ] Reducer Tests