import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyDhjlG6BTbr-eTuIDBDE0lSVpUqop0kLtc",
    authDomain: "react-wallforum.firebaseapp.com",
    databaseURL: "https://react-wallforum.firebaseio.com",
    projectId: "react-wallforum",
    storageBucket: "react-wallforum.appspot.com",
    messagingSenderId: "1085897747914",
    appId: "1:1085897747914:web:0bd050cd6f94d708f07333",
    measurementId: "G-EE371BHCEN"
});

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;