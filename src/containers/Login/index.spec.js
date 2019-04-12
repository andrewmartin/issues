import React from 'react';
import renderer from 'react-test-renderer';
import { Login } from './index';

const user = {
  serverError: null,
};

it('renders Login', () => {
  const tree = renderer.create(<Login user={user} />).toJSON();
  expect(tree).toMatchSnapshot();
});
