import { atom } from 'recoil';
import { Todo } from '../types';

export const todoStates = atom<Todo[]>({
  key: 'todoStates',
  default: [],
});
