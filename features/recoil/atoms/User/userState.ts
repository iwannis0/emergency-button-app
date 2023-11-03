import {atom} from 'recoil';
import {IUser} from '../../interfaces/IUser';
import {User} from './User';
import {persistAtom} from '../../persistAtom';

export const userState = atom<IUser>({
  key: 'userState',
  default: new User('', '', '', false, false, ''),
  effects_UNSTABLE: [persistAtom('userStatePersistStorage')],
});
