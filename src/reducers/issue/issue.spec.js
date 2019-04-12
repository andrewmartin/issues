import reducer, { setOrder } from './issue';

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

describe('actions', () => {
  it('setOrder', () => {
    expect(
      reducer(
        {},
        setOrder({
          name: 'test',
          issues: items,
        })
      )
    ).toEqual({ order: { test: { '100': 2, '125': 0, '300': 1 } } });
  });
});
