// recoil/selectors/userSelectors.ts
import {selector} from 'recoil';
import {userState} from '../atoms/User/userState';

export const loggedInSelector = selector({
  key: 'loggedInSelector',
  get: ({get}) => {
    const user = get(userState);
    return user.loggedIn;
  },
});

export const keepLoggedInSelector = selector({
  key: 'keepLoggedInSelector',
  get: ({get}) => {
    const user = get(userState);
    return user.keepLoggedIn;
  },
});

export const idSelector = selector({
  key: 'idSelector',
  get: ({get}) => {
    const user = get(userState);
    return user.id;
  },
});

export const tokenSelector = selector({
  key: 'tokenSelector',
  get: ({get}) => {
    const user = get(userState);
    return user.token;
  },
  set: ({set, get}, newValue) => {
    const user = get(userState);
    if (typeof newValue === 'string') {
      set(userState, {...user, token: newValue});
    }
  },
});
