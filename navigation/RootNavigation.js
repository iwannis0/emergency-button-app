// Basics
import React from 'react';

// Components
import {Authenticated, NonAuthenticated} from './MainNavigation';

// Values
import {useRecoilState} from 'recoil';
import {userState} from '../features/recoil/atoms/User/userState';

const RootNavigation = () => {
  const [user, setUser] = useRecoilState(userState);
  return user.loggedIn ? <Authenticated /> : <NonAuthenticated />;
};

export default RootNavigation;
