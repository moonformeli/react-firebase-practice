import { collection, Firestore, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { Todo } from '../types';
import { useSetRecoilState } from 'recoil';
import { todoStates } from '../states';

export const useSubscribe = (db: Firestore | null) => {
  const setTodos = useSetRecoilState(todoStates);

  useEffect(() => {
    if (db) {
      const unsubscribe = onSnapshot(collection(db, 'todolist'), (snapshot) => {
        const todos = snapshot.docs.map<Todo>(
          (doc) => doc.data() as unknown as Todo
        );

        setTodos(todos);
      });

      return () => unsubscribe();
    }
  }, [db]);
};
