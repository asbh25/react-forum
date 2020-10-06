import React, { useState } from 'react';
// import { SignIn } from './components/SignIn';
// import { Forum } from './components/Forum';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './App.css';

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

const auth = firebase.auth();
const firestore = firebase.firestore();
// const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <h1>My goal is to make this shit in two days, deadline - 18:00 hours</h1>
      <header>
        <SignOut />
      </header>

      <section>
        {user ? <Forum /> : <SignIn />}
      </section>
    </div>
  );
}

const SignIn = () => {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
  );
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function Forum() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (event) => {
    event.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
  }

  return (<>
    <main>
      <h1>We're in forum!</h1>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    </main>

    <form onSubmit={sendMessage}>

      <input
        value={formValue}
        onChange={({ target }) => setFormValue(target.value)}
        placeholder="say something nice" 
      />

      <button type="submit" disabled={!formValue}>Send</button>

    </form>
  </>);
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="avatar" />
      <p>{text}</p>
    </div>
  </>)
}


export default App;
