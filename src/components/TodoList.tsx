import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  if (!todos.length) {
    return null;
  }

  return (
    <ul>
      {todos.map((todo, i) => (
        <li key={i}>{todo.taskName}</li>
      ))}
    </ul>
  );
}
