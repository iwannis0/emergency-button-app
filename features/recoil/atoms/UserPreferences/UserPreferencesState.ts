import {atom} from 'recoil';
import {IUserPreferences} from '../../interfaces/IUserPreferences';
import {UserPreferences} from './UserPreferences';
import {persistAtom} from '../../persistAtom';

export const UserPreferencesState = atom<IUserPreferences>({
  key: 'keepLoggedInState',
  default: new UserPreferences(false, 'English'),
  effects_UNSTABLE: [persistAtom('keepLoggedInPersistened')],
});
