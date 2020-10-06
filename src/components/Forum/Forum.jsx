import React, { useState } from 'react';
import { ChatMessage } from '../ChatMessage';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import { auth, firestore } from '../../firebase/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import './Forum.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    button: {
      margin: theme.spacing(1),
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
      createdAt: +Date.now(),
      uid,
      photoURL
    });

    setFormValue('');
  }

  return (<>
    <form onSubmit={sendMessage} className={classes.root}>
      <TextField
        required
        id="standard-required"
        // label="Say something nice"
        defaultValue="Say something nice" 
        value={formValue}
        onChange={({ target }) => setFormValue(target.value)}
        placeholder="Say something nice"
      />

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        type="submit"
        disabled={!formValue}
      >
        Send
      </Button>
    </form>

    <div className="container">
      {messages && messages
      .sort((a, b) => b.createdAt - a.createdAt)
      .map(msg => 
        <ChatMessage key={msg.id} message={msg} />
      )
    }
    </div>
  </>);
}
