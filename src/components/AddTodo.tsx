import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Firestore } from 'firebase/firestore';
import TodoService from '../services/TodoService';

interface AddTodoProps {
  db: Firestore | null;
}

export default function AddTodo({ db }: AddTodoProps) {
  const [todo, setTodo] = useState('');
  const todoService = TodoService.getInstance();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!todo.trim()) {
      return;
    }

    if (await todoService.addTodo(todo)) {
      alert('Success');
      setTodo('');
    } else {
      alert('Failed');
    }
  };

  return (
    <form className='flex gap-4' onSubmit={handleSubmit}>
      <input
        className='border-[1px] border-solid border-red-700'
        value={todo}
        onChange={handleChange}
      />
      <button className='border-[1px] border-solid border-red-700 p-2'>
        Submit
      </button>
    </form>
  );
}
