import { sortIssues, selectIssues } from '.';

const items = [
  {
    id: 125,
    created_at: 6,
  },
  {
    id: 300,
    created_at: 4,
  },
  {
    id: 100,
    created_at: 2,
  },
];

const state = {
  issue: {
    items,
    order: {
      test: {
        125: 2,
        300: 1,
        100: 0,
      },
    },
  },
};

describe('selectors', () => {
  describe('sortIssues', () => {
    it('sort based on state', () => {
      expect(sortIssues(state.issue.items[0], state.issue.items[1], state, 'test')).toEqual(1);
    });

    it('sort based on state', () => {
      expect(sortIssues(state.issue.items[1], state.issue.items[0], state, 'test')).toEqual(-1);
    });

    it('sort by created_at if the key isnt present', () => {
      expect(sortIssues(state.issue.items[1], state.issue.items[0], state, 'empty')).toEqual(-1);
    });
  });

  describe('selectIssues', () => {
    it('select the issues', () => {
      expect(selectIssues(state, 'test')).toEqual([
        { created_at: 2, id: 100 },
        { created_at: 4, id: 300 },
        { created_at: 6, id: 125 },
      ]);
    });
  });
});
