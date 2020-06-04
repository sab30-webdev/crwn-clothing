import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC7UtxEhk_JrM4UfZt3aBP3hPbyKsQFYLs",
  authDomain: "crwn-db-640ba.firebaseapp.com",
  databaseURL: "https://crwn-db-640ba.firebaseio.com",
  projectId: "crwn-db-640ba",
  storageBucket: "crwn-db-640ba.appspot.com",
  messagingSenderId: "975928787527",
  appId: "1:975928787527:web:72caf3eb3818d65aa26762",
  measurementId: "G-FK50MKK6V4",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
