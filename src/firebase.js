import * as firebase from 'firebase';
import 'firebase/auth';

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

// var provider = new firebase.auth.GoogleAuthProvider();
// //var user = firebase.auth().currentUser;
// var name, email;
//
//
// firebase.auth().useDeviceLanguage();
// firebase.auth().onAuthStateChanged(function(user){
//
// 	if(user != null){
// 		name = user.displayName;
// 		email = user.email;
// 		alert(name + ': ' + email);
// 	}
// 	else{
// 		alert('Working on Redirect for initial log in');
// 		firebase.auth.signinWithRedirect(provider);
// 		firebase.auth().getRedirectResult().then(function(result) {
// 			if (result.credential) {
// 				//This gives you a Google Access Token.
// 				//var token = result.credential.accessToken;
// 			}
// 			user = result.user;
// 		}).catch(function(error) {
// 				// Handle Errors here.
// 				var errorCode = error.code;
// 				var errorMessage = error.message;
// 				// The email of the user's account used.
// 				var errorEmail = error.email;
// 				// The firebase.auth.AuthCredential type that was used.
// 				var credential = error.credential;
//
// 				//Output line for error variables to silence unused var warnings
// 				alert(errorCode + errorMessage + errorEmail + credential);
// 		});
// 	}
// });
