import React from 'react';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Home from '../../components/home/home';
import { NotiButton } from '../../components/Btn/headerBtn';
import { NotiBtn } from '../../config/handle';
import MyBottomTab from './bottomTabNavigation';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../redux/actions';
import { Alert } from 'react-native';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const dispatch = useDispatch()
  const askLogOut = () => {
    Alert.alert('Warning', 'Bạn có muốn đăng xuất?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => dispatch(logOutUser()) },
    ]);
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => askLogOut()} />
    </DrawerContentScrollView>
  );
}

const MyDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={
      props => <CustomDrawer {...props} />
    }>
      <Drawer.Screen
        component={Home}
        name="Dashboard"
        options={{
          title: 'Home',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'WorkSans',
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <NotiButton
              // containerStyle={{backgroundColor: 'black'}}
              // onPress={() => console.log('Pressed')}
              onPress={() => NotiBtn()}
            />
          ),
        }}
      />
      <Drawer.Screen
        component={MyBottomTab}
        name="Ticket"
        options={{
          title: 'Ticket List',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'WorkSans',
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <NotiButton
              // containerStyle={{backgroundColor: 'black'}}
              onPress={() => NotiBtn()}
            />
          ),
        }}
      />
      {/* <Drawer.Group screenOptions={{presentation: 'modal'}}>
        <Drawer.Screen
          component={ViewTicket}
          name="VỉewTicket"
          options={{
            drawerItemStyle: {display: 'none'},
          }}
        />
      </Drawer.Group> */}
    </Drawer.Navigator>
  );
};

export { MyDrawer };
