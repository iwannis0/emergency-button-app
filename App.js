import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';
import {RecoilRoot} from 'recoil';
import TokenManager from './features/auth/TokenManager';
import SMSListener from './services/SMSListener';

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
          <SMSListener />
        <RootNavigation />
        <TokenManager />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
