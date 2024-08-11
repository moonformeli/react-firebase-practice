import { collection, Firestore, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';

export const useSubscribe = (db: Firestore | null) => {
  useEffect(() => {
    if (db) {
      const unsubscribe = onSnapshot(collection(db, 'todolist'), (docs) => {
        docs.forEach((doc) => {
          console.log('onSnapshot', doc.id, doc.data());
        });
      });

      return () => unsubscribe();
    }
  }, [db]);
};
