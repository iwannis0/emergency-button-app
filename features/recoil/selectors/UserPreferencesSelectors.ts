import {selector} from 'recoil';
import {UserPreferencesState} from '../atoms/UserPreferences/UserPreferencesState';

export const keepLoggedInSelector = selector({
  key: 'keepLoggedInSelector',
  get: ({get}) => {
    const userPreferences = get(UserPreferencesState);
    return userPreferences.keepLoggedIn;
  },
  set: ({set, get}, newValue) => {
    const user = get(UserPreferencesState);
    if (typeof newValue === 'boolean') {
      set(UserPreferencesState, {...user, keepLoggedIn: newValue});
    }
  },
});

export const languageSelector = selector({
  key: 'languageSelector',
  get: ({get}) => {
    const userPreferences = get(UserPreferencesState);
    return userPreferences.language;
  },
  set: ({set, get}, newValue) => {
    const user = get(UserPreferencesState);
    if (typeof newValue === 'string') {
      set(UserPreferencesState, {...user, language: newValue});
    }
  },
});
