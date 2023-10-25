import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import store from '../config/store';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { MyDrawer } from './navigations/drawerNavigation';
import theme from '../assets/res/theme';
import loginHook from '../components/loginScreen/loginHook';
import { getNoti, hanldeNoti, requestUserPermission } from '../config/notification';
import ViewTicket from '../components/ticketScreen/viewTicket';
import NotiScreen from '../components/notification/notiScreen';
import UserInfo from '../components/userScreen/userInfo';

const Stack = createStackNavigator()

const RootStack = () => {

  React.useEffect(() => {
    hanldeNoti().catch(console.error)
  }, [])

  const isLogin = useSelector(state => state.user.isLoginedIn)
  console.log('Check login state:', isLogin)
  return (
    <NavigationContainer>

      <Stack.Navigator>
        {isLogin === false ? (
          // Check Login Stack
          <Stack.Group>
            {/* Auth Group */}
            <Stack.Screen
              name='Login'
              component={loginHook}
              options={{
                headerBackVisible: false,
                headerShown: false,
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Logined"
              component={MyDrawer}
              options={{
                headerBackVisible: false,
                headerShown: false,
              }}
            />
          </Stack.Group>
        )}
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            component={ViewTicket}
            name="VỉewTicket"
            options={{
              tabBarItemStyle: { display: 'none' },
              headerBackVisible: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            component={NotiScreen}
            name="NotiScreen"
            options={{
              headerBackVisible: false,
              headerShown: false,
              drawerItemStyle: { display: 'none' }
            }}
          />
          <Stack.Screen
            component={UserInfo}
            name="UserInfo"
            options={{
              headerBackVisible: false,
              headerShown: false,
              drawerItemStyle: { display: 'none' }
            }}
          />
        </Stack.Group>
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