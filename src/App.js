import React from 'react';
import { Header } from './components/Header';
import { SignIn, SignOut } from './components/SignInOut';
import { Forum } from './components/Forum';

import { auth } from './firebase/firebase';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <Header />
        <SignOut />
      </header>

      <section>
        {user ? <Forum /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
