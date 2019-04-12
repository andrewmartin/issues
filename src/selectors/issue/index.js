// Sort issues based on their repo name key in the state tree, and order index.
// We need to check for a two things:
// 1. Whether the actual key (name of the repo) exists in the state tree
// 2. Whether an index sort value for this particlar issue exists in the state tree (was the issue added after we set the sort?)
export const sortIssues = (a, b, state, name) => {
  if (state.issue.order && state.issue.order[name]) {
    return state.issue.order[name][a.id] < state.issue.order[name][b.id] ? -1 : 1;
  }

  return a.created_at < b.created_at ? -1 : 1;
};

export const selectIssues = (state, name) => {
  return state.issue.items ? state.issue.items.sort((a, b) => sortIssues(a, b, state, name)) : [];
};
