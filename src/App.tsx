import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import './App.css';

import Login from './components/Login';
import { useFirebaseInit, useSubscribe, useTodos } from './hooks';
import { todoStates } from './states';
import TodoList from './components/TodoList';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const { app, db } = useFirebaseInit();

  // const todos = useTodos(db);

  useSubscribe(db);

  const todos = useRecoilValue(todoStates);

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
      <TodoList db={db} todos={todos} />
    </div>
  );
}

export default App;
