import React from 'react';
import Button from '@material-ui/core/Button';

import { auth, provider } from '../../firebase/firebase';

export const SignIn = () => {
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  }

  return (
      <Button color="inherit" onClick={signInWithGoogle}>Sign In</Button>
      // <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
  );
}

export const SignOut = () => {
  return auth.currentUser && (
    <Button color="inherit" className="sign-out" onClick={() => auth.signOut()}>Sign Out</Button>
  )
}
