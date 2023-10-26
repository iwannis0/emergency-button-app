import {atom} from 'recoil';

export interface User {
  name: string;
  username: string;
  loggedIn: boolean;
  token: string;
}

export const userState = atom<User>({
  key: 'userState',
  default: {
    name: '',
    username: '',
    loggedIn: false,
    token: '',
  },
});
