import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
//import configureMockStore from 'redux-mock-store';
//import thunk from 'redux-thunk';
//import { Provider } from 'react-redux';
import CalApp from './calApp';
import FirebaseApp from './FirebaseApp'
import firebase from 'firebase';

// const mockStore = configureMockStore([thunk]);
// const store = mockStore();
// const FirebaseAuthProps = {};


jest.mock('firebase', () => {
  const data = { name: "text" };
  const snapshot = { val: () => data };
  const ref = jest.fn().mockReturnThis();
  const on = jest.fn(() => Promise.resolve(snapshot));
  const database = jest.fn();
  database.Database = jest.fn().mockReturnValue({ref,on});

  const auth = jest.fn();

  const mAuth = { signInWithRedirect: jest.fn() };
  auth.GoogleAuthProvider = jest.fn();
  auth.Auth = jest.fn(() => mAuth);
  return { auth, database };
});

describe('<CalApp />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
const wrapper = mount(<CalApp />);
const wrapper2 = mount(<CalApp />);
const wrapper3 = mount(<CalApp />);
//wrapper.update();
if(wrapper.find('outty') > 0){
  wrapper.find('outty').simulate("click");
}

it('renders without crashing', () => {
  firebase.auth.mockImplementation(() => new firebase.auth.Auth());
  const div = document.createElement('div');
  ReactDOM.render(<CalApp />, div);
});


it('render with dataload', done => {
  firebase.auth.mockImplementation(() => new firebase.auth.Auth());
  const div = document.createElement('div');
  wrapper3.setState({cuid:'7JmSHENe6vebq1H5JOP3n0VObsD3'});
  const itemsRef = FirebaseApp.database().ref('text');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
     try {
       expect(items).toStrictEqual(expect.anything());
       done();
     } catch (error) {
       done(error);
     }
  });
  wrapper3.setState({cuid:'7JmSHENe6vebq1H5JOP3n0VObsD3'});
  wrapper3.setState({isSignedIn:true});
  ReactDOM.render(wrapper3, div);
  wrapper3.setState({cuid:'tGVt2mPFHXTEh9xl40SQEirzYaU2'});
  wrapper3.update();
//  wrapper3.update();
  wrapper3.setState({isSignedIn:false});
  wrapper3.setState({cuid:'7JmSHENe6vebq1H5JOP3n0VObsD3'});
  wrapper3.setState({isSignedIn:true});
  ReactDOM.render(<CalApp/>, div);
});

it('async comparison', () => {
  firebase.auth.mockImplementation(() => new firebase.auth.Auth());
  const div = document.createElement('div');
  wrapper3.setState({cuid:'7JmSHENe6vebq1H5JOP3n0VObsD3'});
  wrapper3.setState({cuid:'7JmSHENe6vebq1H5JOP3n0VObsD3'});
  wrapper3.setState({isSignedIn:true});
  ReactDOM.render(wrapper3, div);
  wrapper3.setState({cuid:'tGVt2mPFHXTEh9xl40SQEirzYaU2'});
  wrapper3.update();
//  wrapper3.update();
  wrapper3.setState({isSignedIn:false});
  wrapper3.setState({cuid:'7JmSHENe6vebq1H5JOP3n0VObsD3'});
  wrapper3.setState({isSignedIn:true});
  expect(ReactDOM.render(<CalApp/>, div)).toStrictEqual(expect.anything());
});

// it('clickcolors', () => {
//   const wrapper4 = shallow(<CalApp />);
//   const instance = wrapper4.instance();
//   wrapper4.setState({cuid:'7JmSHENe6vebq1H5JOP3n0VObsD3'});
// //  const event = wrapper4.find("#.fc-event-main");
// //  expect(event.simulate("click")).toStrictEqual(expect().anything;
//   expect(wrapper4.find("fc-event-main")).toStrictEqual(expect().anything;
// });


it('render when signing in and out', done => {
  firebase.auth.mockImplementation(() => new firebase.auth.Auth());
  wrapper2.setState({cuid:'tGVt2mPFHXTEh9xl40SQEirzYaU2'});
  const itemsRef = FirebaseApp.database().ref('text');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
     try {
       expect(items).toStrictEqual(expect.anything());
       done();
     } catch (error) {
       done(error);
     }
  });
  wrapper2.setState({cuid:'tGVt2mPFHXTEh9xl40SQEirzYaU2'});
  const div = document.createElement('div');
  ReactDOM.render(wrapper2, div);
  wrapper2.update();
  wrapper2.setState({cuid:'tGVt2mPFHXTEh9xl40SQEirzYaU2'});
  wrapper2.update();
  wrapper2.setState({isSignedIn:false});
  wrapper2.setState({isSignedIn:true});
  ReactDOM.render(<CalApp />, div);
});


// test('compare output', done => {
//   firebase.auth.mockImplementation(() => new firebase.auth.Auth());
//   firebase.auth.currentUser = true;
//   const itemsRef = FirebaseApp.database().ref('text');
//   itemsRef.on('value', (snapshot) => {
//     let items = snapshot.val();
//      try {
//        expect(items).toStrictEqual(expect().anything;
//        done();
//      } catch (error) {
//        done(error);
//      }
//   });
//
//   const component = renderer.create(<CalApp />,);
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });


});


// import React from 'react';
// import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
// import CalApp from './calApp';
//
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<CalApp />, div);
// });
//
// test('compare output', () => {
//   const component = renderer.create(
//     <CalApp />,
//   );
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
