import React, { useState } from 'react';
import { ChatMessage } from '../ChatMessage';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";

import { auth, firestore, provider } from "../../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import "./Forum.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1),
    },
  },
}));

export const Forum = () => {
  const classes = useStyles();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();

    if (!auth.currentUser) {
      auth.signInWithPopup(provider);
      return;
    }

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue.trim(),
      createdAt: +Date.now(),
      uid,
      photoURL,
    });

    setFormValue("");
  };

  const getUser = () => {
    if (auth.currentUser) {
      return auth.currentUser.uid;
    }

    return 0;
  }

  const removeComment = (createdAt) => {
    messagesRef.where('createdAt', '==', createdAt).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          messagesRef.doc(doc.id).delete();
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  return (
    <>
      <div className="container">
        {messages &&
          messages
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((msg) => (
              <div className="wrapper" key={msg.id}>
                <ChatMessage message={msg} userId={getUser()} removeComment={removeComment} key={msg.id} />
              </div>
            ))}
      </div>

      <form onSubmit={sendMessage} className="makeStyles-root-4">
        <div className="input-box">
          <TextField
            required
            id="standard-required"
            defaultValue="Say something nice"
            value={formValue}
            onChange={({ target }) => setFormValue(target.value.trimLeft())}
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
        </div>
      </form>
    </>
  );
};
