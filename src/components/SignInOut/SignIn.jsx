import React from 'react';
import Button from '@material-ui/core/Button';
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

import { auth, provider } from '../../firebase/firebase';

import './SignOut.css';

export const SignIn = () => {
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  }

  return (
    <Button color="inherit" onClick={signInWithGoogle}>
      Sign In
    </Button>
  );
};

export const SignOut = () => {
  return auth.currentUser && (
    <PowerSettingsNewIcon
        className="sign-out"
        onClick={() => auth.signOut()}
    />
  );
};
