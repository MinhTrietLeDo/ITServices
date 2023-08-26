import React from 'react';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import TicketScreen from '../../components/ticketScreen/ticketScreen';
import Home from '../../components/home/home';

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
    <Drawer.Navigator
      // useLegacyImplementation
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen component={Home} name="Dashboard" />
      <Drawer.Screen component={TicketScreen} name="Ticket" />
    </Drawer.Navigator>
  );
}

export { MyDrawer };
