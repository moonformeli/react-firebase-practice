import { atom } from 'recoil';

export const imageStates = atom<string[]>({
  key: 'imageStates',
  default: [],
});
