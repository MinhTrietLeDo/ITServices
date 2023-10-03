import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyStack } from './stackNavigation';
import Home from '../../components/home/home';
import TicketScreen from '../../components/ticketScreen/ticketScreen';
import { MyDrawer } from './drawerNavigation';
import ViewTicket from '../../components/ticketScreen/viewTicket';
import { windowHeight, windowWidth } from '../../assets/res/courseStyle';

const Tab = createBottomTabNavigator();

const MyBottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Group>
        <Tab.Screen
          name="Mới"
          component={Home}
          options={{
            headerBackVisible: false,
            headerShown: false,
            tabBarLabelStyle: {
              fontFamily: 'WorkSans',
              fontSize: (windowHeight + windowWidth) * 0.012
            }
          }}

        />
        <Tab.Screen
          name="Đang Xử Lý"
          component={Home}
          options={{
            headerBackVisible: false,
            headerShown: false,
            tabBarLabelStyle: {
              fontFamily: 'WorkSans',
              fontSize: (windowHeight + windowWidth) * 0.012
            }
          }}
        />
        <Tab.Screen
          name="Đã Xử Lý"
          component={TicketScreen}
          options={{
            headerBackVisible: false,
            headerShown: false,
            tabBarLabelStyle: {
              fontFamily: 'WorkSans',
              fontSize: (windowHeight + windowWidth) * 0.012
            }
          }}
        />
      </Tab.Group>
      <Tab.Group screenOptions={{ presentation: 'modal' }}>
        <Tab.Screen
          component={ViewTicket}
          name="VỉewTicket"
          options={{
            tabBarItemStyle: { display: 'none' },
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
}

export default MyBottomTab