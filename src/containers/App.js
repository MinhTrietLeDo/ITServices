import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './navigations/stackNavigation';
import { Provider } from 'react-redux';
import store from '../config/store';
import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';


const AuthNavigation = createStackNavigator()

const App = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}

export default App