import React from 'react';
import {Authenticated, NonAuthenticated} from './MainNavigation';
import {useRecoilValue} from 'recoil';
import {loggedInSelector} from '../features/recoil/selectors/userSelectors';

const RootNavigation = () => {
  const isLoggedIn = useRecoilValue(loggedInSelector);
  return isLoggedIn ? <Authenticated /> : <NonAuthenticated />;
};

export default RootNavigation;
