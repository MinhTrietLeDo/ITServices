import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyStack } from './stackNavigation';
import Home from '../../components/home/home';
import TicketScreen from '../../components/ticketScreen/ticketScreen';
import { MyDrawer } from './drawerNavigation';

const Tab = createBottomTabNavigator();

const MyBottomTab = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Home" component={MyStack} /> */}
      <Tab.Screen
        name="Home Page"
        component={Home}
        options={{
          headerBackVisible: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={MyDrawer}
        options={{
          headerBackVisible: false,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default MyBottomTab