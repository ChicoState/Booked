import * as firebase from "firebase/app";
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: "AIzaSyAbrPremBQusjYoKqKfTcVHwxuw-Q8ikHw",
  authDomain: "booked-8586e.firebaseapp.com",
  databaseURL: "https://booked-8586e.firebaseio.com",
  projectId: "booked-8586e",
  storageBucket: "booked-8586e.appspot.com",
  messagingSenderId: "24720035765",
  appId: "1:24720035765:web:3d57fd5c840b8100c353fc",
  measurementId: "G-20QKEY7V1D"
});

export default app;

//firebase.initializeApp(config);

// var provider = new firebase.auth.GoogleAuthProvider();
// var result = firebase.auth().signInWithPopup(provider);
// var user = result.user;
// firebase.auth().signInWithRedirect(provider)
