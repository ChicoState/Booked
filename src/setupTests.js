import React from 'react';
import Enzyme, {
  configure,
  shallow,
  mount,
  render,
} from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
configure({ adapter: new Adapter() });

global.React = React;
global.Enzyme = Enzyme;
global.shallow = shallow;
global.render = render;
global.mount = mount;
