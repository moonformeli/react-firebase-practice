import React, { useState } from 'react';
import './App.css';

import Login from './components/Login';
import { useFirebaseInit, useTodos } from './hooks';

import TodoList from './components/TodoList';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const { app, db } = useFirebaseInit();
  const todos = useTodos(db);

  console.log('todos', todos);

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
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
