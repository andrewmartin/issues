import React from 'react';
import renderer from 'react-test-renderer';
import TextInput from './index';

it('renders TextInput', () => {
  const tree = renderer.create(<TextInput />).toJSON();
  expect(tree).toMatchSnapshot();
});
