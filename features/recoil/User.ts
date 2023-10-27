import {atom} from 'recoil';
import {IUser} from './interfaces/IUser';
import {User} from './models/User';

<<<<<<< HEAD
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
=======
export const userState = atom<IUser>({
  key: 'userState',
  default: new User(),
>>>>>>> a5ebdff6897328e616c660c74a1495122a9eba3e
});
