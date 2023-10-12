import React, { useEffect } from 'react';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NotiButton } from '../../components/Btn/headerBtn';
import { NotiBtn } from '../../config/handle';
import TicketTab from './ticketBottomTab';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../redux/actions';
import { Alert } from 'react-native';
import { Text, Avatar, Divider } from 'native-base';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { windowHeight, windowWidth } from '../../assets/res/courseStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingScreen from '../../components/setting/setting';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DashboardTab from './dashboardBottomTab';

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.userObj.glpifriendlyname);
  const askLogOut = () => {
    Alert.alert('Warning', 'Bạn có muốn đăng xuất?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => dispatch(logOutUser()) },
    ]);
  };

  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <View style={{ margin: (windowHeight + windowWidth) * 0.015 }}>
            <Text
              style={{
                fontSize: windowWidth * 0.052,
                fontWeight: 800,
                textAlign: 'center',
                alignItems: 'center',
              }}
              note>
              Xin Chào!
            </Text>
            <Text
              style={{
                fontSize: windowWidth * 0.05,
                fontWeight: 600,
                textAlign: 'center',
                alignItems: 'center',
              }}
              note>
              {username}
            </Text>
            <View style={styles.split} />
          </View>
        </View>
        <DrawerItemList {...props} />
        <View style={styles.botContainer}>
          <View style={styles.splitBottom} />
          <DrawerItem
            label="Logout"
            onPress={() => askLogOut()}
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="exit-to-app"
                color={color}
                size={(windowHeight + windowWidth) * 0.022}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} screenOptions={{}} />}>
      <Drawer.Screen
        component={DashboardTab}
        name="Dashboard"
        options={{
          title: 'Dashboard',
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
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="monitor-dashboard"
              size={(windowHeight + windowWidth) * 0.022}
            />
          ),
        }}
      />
      <Drawer.Screen
        component={TicketTab}
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
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="ticket-confirmation"
              size={(windowHeight + windowWidth) * 0.022}
            />
          ),
        }}
      />
      <Drawer.Screen
        component={SettingScreen}
        name="Setting"
        options={{
          title: 'Setting',
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
          drawerIcon: () => (
            <AntDesign
              name="setting"
              size={(windowHeight + windowWidth) * 0.022}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
    height: windowHeight * 0.97,
    margin: (windowHeight + windowWidth) * 0.001,
    // justifyContent: 'sp',
    alignContent: 'center',
    alignSelf: 'stretch',
  },
  topContainer: {
    // backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // marginTop: windowHeight * 0.01,
  },
  botContainer: {
    // top: windowHeight * 0.01,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  avatar: {
    height: windowHeight * 0.15,
    borderRadius: (windowWidth + windowHeight) * 0.5,
    width: windowWidth * 0.282,
    resizeMode: 'cover'
  },
  split: {
    borderWidth: (windowHeight + windowWidth) * 0.0005,
    width: windowWidth * 0.5,
    marginTop: windowHeight * 0.01,
    borderColor: '#D3D3D3',
  },
  splitBottom: {
    borderWidth: (windowHeight + windowWidth) * 0.0005,
    width: windowWidth * 0.5,
    marginTop: windowHeight * 0.01,
    borderColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export { MyDrawer };
