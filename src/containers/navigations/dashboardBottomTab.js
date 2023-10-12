import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ViewTicket from '../../components/ticketScreen/viewTicket';
import {windowHeight, windowWidth} from '../../assets/res/courseStyle';
import TicketScreen from '../../components/ticketScreen/ticketScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../../components/home/home';
import SettingScreen from '../../components/setting/setting';

const Tab = createBottomTabNavigator();

const DashboardTab = () => {

  return (
    <Tab.Navigator>
      <Tab.Group>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerBackVisible: false,
            headerShown: false,
            tabBarLabelStyle: {
              fontFamily: 'WorkSans',
              fontSize: (windowHeight + windowWidth) * 0.012,
            },
            headerTitleAlign: 'center',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AAA"
          component={SettingScreen}
          options={{
            headerBackVisible: false,
            headerShown: false,
            tabBarLabelStyle: {
              fontFamily: 'WorkSans',
              fontSize: (windowHeight + windowWidth) * 0.012,
            },
            headerTitleAlign: 'center',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="progress-upload"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default DashboardTab;
