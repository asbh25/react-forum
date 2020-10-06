import React, { useState } from 'react';
import { ChatMessage } from '../ChatMessage';

import firebase, { auth, firestore } from '../../firebase/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export const Forum = () => {
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
      {messages && messages.map(msg => 
        <ChatMessage key={msg.id} message={msg} />
      )}
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
