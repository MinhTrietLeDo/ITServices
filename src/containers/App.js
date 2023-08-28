import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import store from '../config/store';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { MyDrawer } from './navigations/drawerNavigation';
import LoginScreen from '../components/loginScreen/loginScreen';

const Stack = createStackNavigator()

const RootStack = () => {
  const isLogin = useSelector(state => state.user.isLoginedIn)
  console.log('Check login state:', isLogin)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogin === false ? (
          // Check Login Stack
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={MyDrawer}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const App = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <RootStack />
      </Provider>
    </NativeBaseProvider>
  );
}

export default App