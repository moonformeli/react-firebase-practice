import { Firestore } from 'firebase/firestore';
import { Todo } from '../types';
import AddTodo from './AddTodo';

interface TodoListProps {
  db: Firestore | null;
  todos: Todo[];
}

export default function TodoList({ db, todos }: TodoListProps) {
  if (!todos.length) {
    return null;
  }

  return (
    <div>
      <AddTodo db={db} />
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo.taskName}</li>
        ))}
      </ul>
    </div>
  );
}
