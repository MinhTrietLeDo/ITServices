import React, {useEffect} from 'react';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {NotiButton} from '../../components/Btn/headerBtn';
import {NotiBtn} from '../../config/handle';
import TicketTab from './ticketBottomTab';
import {useDispatch, useSelector} from 'react-redux';
import {logOutUser} from '../../redux/actions';
import {Text, Avatar, Divider, Button} from 'native-base';
import {StyleSheet, View, SafeAreaView, Alert} from 'react-native';
import {windowHeight, windowWidth} from '../../assets/res/courseStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingScreen from '../../components/setting/setting';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DashboardTab from './dashboardBottomTab';
import {API_URL, App_Token} from '../../config/config';

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.userObj.glpifriendlyname);
  const token = useSelector(state => state.user.token.session_token);

  const logOut = async () => {
    let objHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'App-Token': App_Token,
    };
    let killSession = await Promise.all([
      await fetch(API_URL + '/killSession?session_token=' + token, {
        headers: objHeader,
      }).then(el => el.json()),
    ]);
    if (typeof killSession !== undefined) {
      dispatch(logOutUser()); //xóa token cũ => chuyển token về rỗng => về màn hình login
    } else {
      Alert.alert('Error', 'Please try again later', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const askLogOut = () => {
    Alert.alert('Warning', 'Bạn có muốn đăng xuất?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => logOut().catch(console.error)},
    ]);
  };

  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <View style={{margin: (windowHeight + windowWidth) * 0.015}}>
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
            icon={({color, size}) => (
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
      <Drawer.Group>
        {/* <Drawer.Screen
          component={DashboardTab}
          name="Dashboard"
          options={{
            title: 'Dashboard',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'WorkSans',
            },
            headerTitleAlign: 'center',
            headerRight: () => <NotiButton onPress={() => NotiBtn()} />,
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="monitor-dashboard"
                size={(windowHeight + windowWidth) * 0.022}
              />
            ),
          }}
        /> */}
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
            headerRight: () => <NotiButton onPress={() => NotiBtn()} />,
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="ticket-confirmation"
                size={(windowHeight + windowWidth) * 0.022}
              />
            ),
          }}
        />
        {/* <Drawer.Screen
          component={SettingScreen}
          name="Setting"
          options={{
            title: 'Setting',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'WorkSans',
            },
            headerTitleAlign: 'center',
            headerRight: () => <NotiButton onPress={() => NotiBtn()} />,
            drawerIcon: () => (
              <Ionicons
                name="settings"
                size={(windowHeight + windowWidth) * 0.022}
              />
            ),
          }}
        /> */}
      </Drawer.Group>
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
    resizeMode: 'cover',
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

export {MyDrawer};
