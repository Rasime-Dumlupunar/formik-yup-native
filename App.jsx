import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/router/rootNavigation';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
