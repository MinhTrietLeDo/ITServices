import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ViewTicket from '../../components/ticketScreen/viewTicket';
import {windowHeight, windowWidth} from '../../assets/res/courseStyle';
import TicketScreen from '../../components/ticketScreen/ticketScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const TicketTab = () => {
  const newTicket =
    '/search/Ticket/?order=DESC&criteria[0][itemtype]=Ticket&criteria[0][field]=12&criteria[0][searchtype]=contains&criteria[0][value]=1&forcedisplay[0]=1&forcedisplay[1]=2&forcedisplay[2]=3&forcedisplay[3]=12&forcedisplay[4]=15&forcedisplay[5]=19&forcedisplay[6]=21&forcedisplay[7]=4&forcedisplay[8]=5&sort=2';
  const pendingTicket =
    '/search/Ticket/?order=DESC&criteria[0][itemtype]=Ticket&criteria[0][field]=12&criteria[0][searchtype]=contains&criteria[0][value]=2&criteria[1][link]=OR&criteria[1][itemtype]=Ticket&criteria[1][field]=12&criteria[1][searchtype]=equals&criteria[1][value]=3&criteria[2][link]=OR&criteria[2][itemtype]=Ticket&criteria[2][field]=12&criteria[2][searchtype]=equals&criteria[2][value]=4&forcedisplay[0]=5&forcedisplay[1]=1&forcedisplay[2]=2&forcedisplay[3]=3&forcedisplay[4]=12&forcedisplay[5]=15&forcedisplay[6]=19&forcedisplay[7]=21&forcedisplay[8]=4&sort=19';
  const closedTicket =
    '/search/Ticket/?order=DESC&criteria[0][itemtype]=Ticket&criteria[0][field]=12&criteria[0][searchtype]=contains&criteria[0][value]=5&criteria[1][link]=OR&criteria[1][itemtype]=Ticket&criteria[1][field]=12&criteria[1][searchtype]=equals&criteria[1][value]=6&forcedisplay[1]=1&forcedisplay[2]=2&forcedisplay[3]=3&forcedisplay[4]=12&forcedisplay[5]=15&forcedisplay[6]=19&forcedisplay[7]=21&forcedisplay[8]=4&forcedisplay[0]=5&sort=19';
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Mới"
        component={TicketScreen}
        options={{
          headerBackVisible: false,
          headerShown: false,
          tabBarLabelStyle: {
            fontFamily: 'WorkSans',
            fontSize: (windowHeight + windowWidth) * 0.012,
          },
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="new-box" color={color} size={size} />
          ),
        }}
        initialParams={{
          ticketURL: newTicket,
        }}
      />
      <Tab.Screen
        name="Đang Xử Lý"
        component={TicketScreen}
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
        initialParams={{ticketURL: pendingTicket}}
      />
      <Tab.Screen
        name="Đã Xử Lý"
        component={TicketScreen}
        options={{
          headerBackVisible: false,
          headerShown: false,
          tabBarLabelStyle: {
            fontFamily: 'WorkSans',
            fontSize: (windowHeight + windowWidth) * 0.012,
          },
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="check" color={color} size={size} />
          ),
        }}
        initialParams={{ticketURL: closedTicket}}
      />
      {/* <Tab.Group screenOptions={{presentation: 'modal'}}>
        <Tab.Screen
          component={ViewTicket}
          name="VỉewTicket"
          options={{
            tabBarItemStyle: {display: 'none'},
            headerBackVisible: false,
            headerShown: false,
          }}
        />
      </Tab.Group> */}
    </Tab.Navigator>
  );
};

export default TicketTab;
