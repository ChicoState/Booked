import React from 'react';
//import * as firebase from "firebase/app";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { withRouter } from 'react-router-dom';
//import 'firebase/auth';
//import app from './firebase';

export default class AuthControl extends React.Component {
//class AuthControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isSignedIn : false};
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callback: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(user => {
      resolve(user)
      this.setState({ isSignedIn: !!user})
      console.log("user", user)
    })
  })
  }

  render() {
    return (
      <div>
      {this.state.isSignedIn ?
      (
        <span>
          <button id="outty" onClick={()=>firebase.auth().signOut()}>Sign out!</button>
          <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          <img alt="profile" src={firebase.auth().currentUser.photoURL}/>
        </span>
      )
      :
      (
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )
      }
      </div>
    )
  }
}

//export default withRouter(AuthControl);
