import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import CalApp from './calApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CalApp />, div);
});

test('compare output', () => {
  const component = renderer.create(
    <CalApp />, 
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
