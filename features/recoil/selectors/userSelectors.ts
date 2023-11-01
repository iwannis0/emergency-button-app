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
