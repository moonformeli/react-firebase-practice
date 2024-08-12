import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import './App.css';

import Login from './components/Login';
import { imageStates, todoStates } from './states';
import TodoList from './components/TodoList';
import TodoService from './services/TodoService';
import AddImage from './components/AddImage';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const todoService = TodoService.getInstance();

  const { app, db } = todoService;

  const urls = useRecoilValue(imageStates);
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
      <AddImage />
      {urls.length > 0 && (
        <ul>
          {urls.map((url, i) => (
            <li key={i}>
              <img src={url} alt='' className='w-[200px] h-[200px]' />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
