import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import LoginProvider from './app/context/LoginProvider';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './app/components/MainNavigator';

const App = () => {
  return (
    <LoginProvider>
        <NavigationContainer> 
            <MainNavigator />
        </NavigationContainer>
    </LoginProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightyellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
