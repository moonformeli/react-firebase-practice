import { Firestore, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Todo } from '../types';

export const useTodos = (db: Firestore | null) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (db) {
      const col = collection(db, 'todolist');

      getDocs(col).then((docs) => {
        const newTodos = [] as Todo[];

        docs.forEach((doc) => {
          if (doc.exists()) {
            newTodos.push(doc.data() as any as Todo);
          }
        });

        setTodos(newTodos);
      });
    }
  }, [db]);

  return todos;
};
