import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Firestore,
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from 'firebase/firestore';
import { Todo } from '../types';

let todoService: TodoService | null;

export default class TodoService {
  private firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  };

  private fApp: FirebaseApp;
  private store: Firestore;

  constructor() {
    this.fApp = initializeApp(this.firebaseConfig);
    this.store = getFirestore(this.fApp);
  }

  static getInstance() {
    if (!todoService) {
      todoService = new TodoService();
    }

    return todoService;
  }

  get app() {
    return this.fApp;
  }

  get db() {
    return this.store;
  }

  private get collectionName() {
    return 'todolist';
  }

  private getCollection() {
    if (!this.db) {
      return;
    }

    return collection(this.db, this.collectionName);
  }

  private async getDocuments() {
    const collectionRef = this.getCollection();

    if (!collectionRef) {
      return;
    }

    return getDocs(collectionRef);
  }

  getTodos(): Promise<Todo[]> {
    return this.getDocuments()
      .then((snapshot) => {
        if (!snapshot) {
          return [];
        }

        return snapshot.docs.map((doc) => doc.data() as unknown as Todo);
      })
      .catch(() => {
        console.log('Can not retrieve the todo list.');
        return [];
      });
  }

  async addTodo(taskName: string) {
    const collectionRef = this.getCollection();

    if (!collectionRef) {
      console.log('Collection does not exist.');
      return false;
    }

    const docRef = await addDoc(collectionRef, {
      taskName,
    });

    if (docRef.id) {
      return true;
    }
    return false;
  }

  subscribe(onUpdate: (todos: Todo[]) => void) {
    const collectionRef = this.getCollection();

    if (!collectionRef) {
      console.log('Collection does not exist.');
      return () => undefined;
    }

    return onSnapshot(collectionRef, (snapshot) => {
      const todos = snapshot.docs.map<Todo>(
        (doc) => doc.data() as unknown as Todo
      );

      onUpdate(todos);
    });
  }
}
