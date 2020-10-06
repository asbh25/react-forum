import React, { useState } from 'react';
import { ChatMessage } from '../ChatMessage';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import firebase, { auth, firestore } from '../../firebase/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export const Forum = () => {
  const classes = useStyles();
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
    });

    setFormValue('');
  }

  return (<>
    <form onSubmit={sendMessage} className={classes.root}>
      {/* <TextField
        required
        id="standard-required"
        label="Say something nice"
        defaultValue="Say something nice" 
        value={formValue}
        onChange={({ target }) => setFormValue(target.value)}
        placeholder="Say something nice"
      /> */}
      <input
        value={formValue}
        onChange={({ target }) => setFormValue(target.value)}
        placeholder="say something nice" 
      />

      <button type="submit" disabled={!formValue}>Send</button>

    </form>

    {messages && messages.map(msg => 
      <ChatMessage key={msg.id} message={msg} />
    )}
  </>);
}
