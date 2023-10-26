import {atom} from 'recoil';

export interface User {
  id: string;
  name: string;
  surname: string;
  loggedIn: boolean;
  token: string;
}

export const userState = atom<User>({
  key: 'userState',
  default: {
    id: '',
    name: '',
    surname: '',
    loggedIn: false,
    token: '',
  },
});
