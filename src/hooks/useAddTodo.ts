import { addDoc, collection, Firestore } from 'firebase/firestore';

export const useAddTodo = (db: Firestore | null) => {
  const addTodo = async (newTodo: string) => {
    if (!db) {
      return false;
    }

    const docRef = await addDoc(collection(db, 'todolist'), {
      taskName: newTodo,
    });

    if (docRef.id) {
      return true;
    }
    return false;
  };

  return { addTodo };
};
