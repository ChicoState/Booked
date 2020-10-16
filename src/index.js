import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth'

import * as firebase from 'firebase';
import 'firebase/auth';

import DemoApp from './DemoApp'
import './main.css'

var config = {
  apiKey: "AIzaSyAbrPremBQusjYoKqKfTcVHwxuw-Q8ikHw",
  authDomain: "booked-8586e.firebaseapp.com",
  databaseURL: "https://booked-8586e.firebaseio.com",
  projectId: "booked-8586e",
  storageBucket: "booked-8586e.appspot.com",
  messagingSenderId: "24720035765",
  appId: "1:24720035765:web:3d57fd5c840b8100c353fc",
  measurementId: "G-20QKEY7V1D"
};

firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();
//var user = firebase.auth().currentUser;
var name, email;


firebase.auth().useDeviceLanguage();
firebase.auth().onAuthStateChanged(function(user){

	if(user != null){
		name = user.displayName;
		email = user.email;
		alert(name + ': ' + email);
	}
	else{
		alert('Working on Redirect for initial log in');
		firebase.auth.signinWithRedirect(provider);
		firebase.auth().getRedirectResult().then(function(result) {
			if (result.credential) {
				//This gives you a Google Access Token.
				//var token = result.credential.accessToken;
			}
			user = result.user;
		}).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var errorEmail = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;

				//Output line for error variables to silence unused var warnings
				alert(errorCode + errorMessage + errorEmail + credential);
		});
	}
});

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('text');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: items[item].id,
          text: items[item].text,
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
          <button
          onClick={gotoCalendar}
          >View Calendar</button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const itemsRef = firebase.database().ref('text');
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    itemsRef.push(newItem);
//    this.setState(state => ({
//      items: state.items.concat(newItem),
//      text: ''
//    }));



  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);

function gotoCalendar(){
setTimeout(() => {  ReactDOM.render(
  <DemoApp />,
  //document.body.appendChild(document.createElement('root'))
  document.getElementById('root')
); }, 1000);
}
