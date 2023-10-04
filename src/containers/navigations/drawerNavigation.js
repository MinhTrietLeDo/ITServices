import React from 'react';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import TicketScreen from '../../components/ticketScreen/ticketClosed';
import Home from '../../components/home/home';
import {NotiButton} from '../../components/Btn/headerBtn';
import {HandleNoti} from '../../config/handle';
import ViewTicket from '../../components/ticketScreen/viewTicket';

const Drawer = createDrawerNavigator();

function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert('Link to help')} />
    </DrawerContentScrollView>
  );
}

const MyDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      {/* <Drawer.Screen
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
              onPress={() => HandleNoti()}
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        component={TicketScreen}
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
              onPress={() => HandleNoti()}
            />
          ),
        }}
      />
      <Drawer.Group screenOptions={{presentation: 'modal'}}>
        <Drawer.Screen
          component={ViewTicket}
          name="VỉewTicket"
          options={{
            drawerItemStyle: {display: 'none'},
          }}
        />
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

export {MyDrawer};
