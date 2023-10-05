import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import store from '../config/store';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { MyDrawer } from './navigations/drawerNavigation';
import theme from '../assets/res/theme';
import loginHook from '../components/loginScreen/loginHook';
import MyBottomTab from './navigations/bottomTabNavigation';

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
            component={loginHook}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Logined"
            component={MyBottomTab}
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
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <RootStack />
      </Provider>
    </NativeBaseProvider>
  );
}

export default App