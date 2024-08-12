import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import './App.css';

import Login from './components/Login';
import { todoStates } from './states';
import TodoList from './components/TodoList';
import TodoService from './services/TodoService';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const todoService = TodoService.getInstance();

  const { app, db } = todoService;

  const [todos, setTodos] = useRecoilState(todoStates);

  useEffect(() => {
    const unsubscribe = todoService.subscribe(setTodos);

    return () => unsubscribe();
  }, []);

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
