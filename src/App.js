import React from 'react';
import { Header } from './components/Header';
import { Forum } from './components/Forum';

import { auth } from './firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import './App.css';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <Header user={user} />
      </header>

      <main className="main">
        {/* {user ? <Forum /> : <p className="welcome-text">Sign in above and write down your amazing comment!</p>} */}
        <Forum user={user} />
      </main>
    </div>
  );
}

export default App;
