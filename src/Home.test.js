import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Home from './Home';
import FirebaseApp from './FirebaseApp'
import firebase from 'firebase';

const mockStore = configureMockStore([thunk]);
const store = mockStore();
const FirebaseAuthProps = {};

// jest.mock('firebase', () => {
//   return {
//     auth: () => {
//       return {
//         onAuthStateChanged: jest.fn(cb => cb({ name: 'Testy', uid: 'tGVt2mPFHXTEh9xl40SQEirzYaU2' }))
//       };
//     },
//   };
// });

// jest.mock('FirebaseApp', () => {
//   return mocksdk;
// });

// jest.mock('./FirebaseApp', () => {
//   const auth = jest.fn();
//   const mAuth = { signInWithRedirect: jest.fn() };
//   auth.GoogleAuthProvider = jest.fn();
//   auth.Auth = jest.fn(() => mAuth);
//   const data = { name: "text" };
//   const snapshot = { val: () => data };
//   auth.onAuthStateChanged = jest.fn(cb => cb({ name: 'Testy', uid: 'tGVt2mPFHXTEh9xl40SQEirzYaU2'}));
//   return {
//     auth,
//     initializeApp: jest.fn().mockReturnValue({
//       database: jest.fn().mockReturnValue({
//         ref: jest.fn().mockReturnThis(),
//         once: jest.fn(() => Promise.resolve(snapshot))
//       })
//     })
//   };
// });

// jest.mock('firebase', () => {
//   const auth = jest.fn();
//   const mAuth = { signInWithRedirect: jest.fn() };
//   auth.GoogleAuthProvider = jest.fn();
//   auth.Auth = jest.fn(() => mAuth);
//   const data = { name: "text" };
//   const snapshot = { val: () => data };
//   auth.onAuthStateChanged = jest.fn(cb => cb({ name: 'Testy', uid: 'tGVt2mPFHXTEh9xl40SQEirzYaU2'}));
//   return {
//     auth,
//     initializeApp: jest.fn().mockReturnValue({
//       database: jest.fn().mockReturnValue({
//         ref: jest.fn().mockReturnThis(),
//         once: jest.fn(() => Promise.resolve(snapshot))
//       })
//     })
//   };
// });





jest.mock('firebase', () => {
  const data = { name: "text" };
  const snapshot = { val: () => data };
  const ref = jest.fn().mockReturnThis();
  const on = jest.fn(() => Promise.resolve(snapshot));
  const database = jest.fn();
  database.Database = jest.fn().mockReturnValue({ref,on});

  const auth = jest.fn();
  const currentUser = jest.fn();

  const mAuth = { signInWithRedirect: jest.fn() };
  auth.currentUser = { displayName: 'Kris Selvidge', uid:'tGVt2mPFHXTEh9xl40SQEirzYaU2'};
  auth.GoogleAuthProvider = jest.fn();
  auth.Auth = jest.fn(() => mAuth);
  return { auth, database };
});

describe('<Home />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
const wrapper = mount(<Home />);
const wrapper2 = mount(<Home />);
const wrapper3 = mount(<Home />);
//wrapper.update();
if(wrapper.find('outty') > 0){
  wrapper.find('outty').simulate("click");
}







it('renders without crashing', () => {
  firebase.auth.mockImplementation(() => new firebase.auth.Auth());
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
});

it('notifications', done => {
  firebase.auth.mockImplementation(() => new firebase.auth.Auth());
  const div = document.createElement('div');
  wrapper.setState({cuid:'7JmSHENe6vebq1H5JOP3n0VObsD3'});
  const itemsRef = FirebaseApp.database().ref('text');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
     try {
       expect(items).anything;
       done();
     } catch (error) {
       done(error);
     }
  });
  wrapper.setState({cuid:'tGVt2mPFHXTEh9xl40SQEirzYaU2'});
  ReactDOM.render(wrapper, div);
  wrapper.update();
  wrapper.setState({noteSent:true});
  wrapper.setState({cuid:'7JmSHENe6vebq1H5JOP3n0VObsD3'});
  wrapper.update();
  wrapper.setState({isSignedIn:false});
  wrapper.setState({isSignedIn:true});
  ReactDOM.render(<Home />, div);
});

it('render with dataload', done => {
  firebase.auth.mockImplementation(() => new firebase.auth.Auth());
  const div = document.createElement('div');
  wrapper3.setState({cuid:'tGVt2mPFHXTEh9xl40SQEirzYaU2'});
  const itemsRef = FirebaseApp.database().ref('text');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
     try {
       expect(items).anything;
       done();
     } catch (error) {
       done(error);
     }
  });
  wrapper3.setState({cuid:'tGVt2mPFHXTEh9xl40SQEirzYaU2'});
  ReactDOM.render(wrapper3, div);
  wrapper3.update();
  wrapper3.setState({cuid:'tGVt2mPFHXTEh9xl40SQEirzYaU2'});
  wrapper3.update();
  wrapper3.setState({isSignedIn:false});
  wrapper3.setState({isSignedIn:true});
  ReactDOM.render(<Home />, div);
});

it('render when signing in and out', done => {
  firebase.auth.mockImplementation(() => new firebase.auth.Auth());
  const div = document.createElement('div');
  wrapper2.setState({cuid:'tGVt2mPFHXTEh9xl40SQEirzYaU2'});
  const itemsRef = FirebaseApp.database().ref('text');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
     try {
       expect(items).anything;
       done();
     } catch (error) {
       done(error);
     }
  });
  wrapper2.setState({cuid:'tGVt2mPFHXTEh9xl40SQEirzYaU2'});
  ReactDOM.render(wrapper2, div);
  wrapper2.update();
  wrapper2.setState({isSignedIn:true});
  wrapper2.setState({cuid:'tGVt2mPFHXTEh9xl40SQEirzYaU2'});
  wrapper2.update();
  wrapper2.setState({isSignedIn:false});
  wrapper2.setState({isSignedIn:true});
  ReactDOM.render(<Home />, div);
});


test('compare output', done => {
  firebase.auth.mockImplementation(() => new firebase.auth.Auth());
  firebase.database.mockImplementation(() => new firebase.database().Database());
  const itemsRef = FirebaseApp.database().ref('text');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
     try {
       expect(items).anything;
       done();
     } catch (error) {
       done(error);
     }
  });
  const component = renderer.create(
    <Home />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

});

// import React from 'react';
// import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
// import Home from './Home';
//


// it('renders without crashing', done => {
//   var testL;
//     const itemsRef = firebase.database().ref('text');
//   const itemsRef = FirebaseApp.database().ref('text').once('value').then((snapshot) => { testL = snapshot.val() || 'Nothing Here' });
//     console.log(testL);
//     console.log("Hi1");
//    itemsRef.on('value', (snapshot) => {
//      let items = snapshot.val();
//      try {
//        expect(items).anything;
//        done();
//      } catch (error) {
//        done(error);
//      }
//      console.log("Hi");
//      console.log(items);
//    });
//     console.log("HELLLLLLLLLO");
//
//   const div = document.createElement('div');
//   ReactDOM.render(<Home />, div);
// });
//
// test('compare output', () => {
//   const component = renderer.create(
//     <Home />,
//   );
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
