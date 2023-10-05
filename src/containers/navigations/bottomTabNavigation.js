import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyStack } from './stackNavigation';
import Home from '../../components/home/home';
import { MyDrawer } from './drawerNavigation';
import ViewTicket from '../../components/ticketScreen/viewTicket';
import { windowHeight, windowWidth } from '../../assets/res/courseStyle';
import TicketScreen from '../../components/ticketScreen/ticketScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();

const MyBottomTab = () => {
  const newTicket = '/search/Ticket/?order=DESC&criteria[0][itemtype]=Ticket&criteria[0][field]=12&criteria[0][searchtype]=contains&criteria[0][value]=1&forcedisplay[0]=1&forcedisplay[1]=2&forcedisplay[2]=3&forcedisplay[3]=12&forcedisplay[4]=15&forcedisplay[5]=19&forcedisplay[6]=21&forcedisplay[7]=4&sort=2';
  const pendingTicket = '/search/Ticket/?order=DESC&criteria[0][itemtype]=Ticket&criteria[0][field]=12&criteria[0][searchtype]=contains&criteria[0][value]=2&criteria[1][link]=OR&criteria[1][itemtype]=Ticket&criteria[1][field]=12&criteria[1][searchtype]=equals&criteria[1][value]=3&forcedisplay[1]=1&forcedisplay[2]=2&forcedisplay[3]=3&forcedisplay[4]=12&forcedisplay[5]=15&forcedisplay[6]=19&forcedisplay[7]=21&forcedisplay[8]=4&sort=2';
  const closedTicket = '/search/Ticket/?order=DESC&criteria[0][itemtype]=Ticket&criteria[0][field]=12&criteria[0][searchtype]=contains&criteria[0][value]=5&criteria[1][link]=OR&criteria[1][itemtype]=Ticket&criteria[1][field]=12&criteria[1][searchtype]=equals&criteria[1][value]=6&forcedisplay[1]=1&forcedisplay[2]=2&forcedisplay[3]=3&forcedisplay[4]=12&forcedisplay[5]=15&forcedisplay[6]=19&forcedisplay[7]=21&forcedisplay[8]=4&sort=2';

  return (
    <Tab.Navigator>
      <Tab.Group>
        <Tab.Screen
          name="Mới"
          component={TicketScreen}
          options={{
            headerBackVisible: false,
            headerShown: false,
            tabBarLabelStyle: {
              fontFamily: 'WorkSans',
              fontSize: (windowHeight + windowWidth) * 0.012
            },
            headerTitleAlign: 'center',
          }}
          initialParams={{ ticketURL: newTicket }}
        />
        <Tab.Screen
          name="Đang Xử Lý"
          component={TicketScreen}
          options={{
            headerBackVisible: false,
            headerShown: false,
            tabBarLabelStyle: {
              fontFamily: 'WorkSans',
              fontSize: (windowHeight + windowWidth) * 0.012
            },
            headerTitleAlign: 'center',
          }}
          initialParams={{ ticketURL: pendingTicket }}
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
            },
            headerTitleAlign: 'center',
          }}
          initialParams={{ ticketURL: closedTicket }}
        />
      </Tab.Group>
      <Tab.Group screenOptions={{ presentation: 'modal' }}>
        <Tab.Screen
          component={ViewTicket}
          name="VỉewTicket"
          options={{
            tabBarItemStyle: { display: 'none' },
            headerBackVisible: false,
            headerShown: false,
            tabBarIcon: () =>(
              <MaterialCommunityIcons name="bell" color={'black'} size={16} />
            ),
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
}

export default MyBottomTab