import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
//import configureMockStore from 'redux-mock-store';
//import thunk from 'redux-thunk';
//import { Provider } from 'react-redux';
import AuthControl from './AuthControl';
import firebase from 'firebase';

// const mockStore = configureMockStore([thunk]);
// const store = mockStore();
// const FirebaseAuthProps = {};

jest.mock('firebase', () => {
  return {
    auth: () => {
      return {
        onAuthStateChanged: jest.fn(cb => cb({ name: 'Testy' }))
      };
    },
  };
});


jest.mock('firebase', () => {
  const auth = jest.fn();
  const mAuth = { signInWithRedirect: jest.fn() };
  auth.GoogleAuthProvider = jest.fn();
  auth.Auth = jest.fn(() => mAuth);
  return { auth };
});

describe('<AuthControl />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
const wrapper = mount(<AuthControl />);
if(wrapper.find('outty') > 0){
  wrapper.find('outty').simulate("click");
}

it('renders without crashing', () => {
  firebase.auth.mockImplementation(() => new firebase.auth.Auth());
  const div = document.createElement('div');
  ReactDOM.render(<AuthControl />, div);
});

test('compare output', () => {
  firebase.auth.mockImplementation(() => new firebase.auth.Auth());
  const component = renderer.create(
    <AuthControl />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

//   const wrapper = mount(<AuthControl />)
//   wrapper.find('button').simulate('click');
//   expect(firebase.auth.GoogleAuthProvider).toBeCalledTimes(1);
// expect(firebase.auth).toBeCalledTimes(1);
// expect(firebase.auth().signInWithRedirect).toBeCalledTimes(1);

});
