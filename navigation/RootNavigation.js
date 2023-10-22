import React from 'react';
import {Authenticated, NonAuthenticated} from './MainNavigation';

const RootNavigation = () => {
  //const user = useSelector(state => state.user);
  //return user.isLoggedIn ? <Authenticated /> : <NonAuthenticated />;
  return <Authenticated />;
};

export default RootNavigation;
