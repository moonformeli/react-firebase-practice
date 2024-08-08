import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { useGoogleLogin } from './hooks';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { signIn } = useGoogleLogin();

  const handleSignIn = async () => {
    const credential = await signIn();

    if (credential?.accessToken) {
      setIsSignedIn(true);
    }
  };

  return (
    <div className='App'>
      <div></div>
      {isSignedIn ? (
        <h1>로그인 완료</h1>
      ) : (
        <button onClick={handleSignIn}>구글 로그인</button>
      )}
    </div>
  );
}

export default App;
