import React, { useState } from 'react';
import './App.css';

import Login from './components/Login';
import { useFirebaseInit } from './hooks';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { app } = useFirebaseInit();

  return (
    <div className='App'>
      <div></div>
      <Login
        app={app}
        isSignedIn={isSignedIn}
        onLogin={() => {
          setIsSignedIn(true);
        }}
      />
    </div>
  );
}

export default App;
