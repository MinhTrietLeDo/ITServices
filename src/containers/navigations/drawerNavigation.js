import React, { useEffect } from 'react';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Home from '../../components/home/home';
import { NotiButton } from '../../components/Btn/headerBtn';
import { NotiBtn } from '../../config/handle';
import MyBottomTab from './ticketTabNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../redux/actions';
import { Alert } from 'react-native';
import { View, Text, Avatar, Divider } from 'native-base';
import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../../assets/res/courseStyle';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const dispatch = useDispatch()
  const username = useSelector(state => state.user.userObj.glpifriendlyname)
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
      <View style={styles.container}>
        <View >
          <Avatar
            style={styles.avatar}
            source={{ uri: 'https://cdn.cwsplatform.com/assets/no-photo-available.png' }}
          />
        </View>

        <View style={{ margin: (windowHeight + windowWidth) * 0.015, }}>
          <Text
            style={{
              fontSize: windowWidth * 0.05,
              fontWeight: 600,
              textAlign: 'center',
              alignItems: 'center',
            }} note>
            {username}
          </Text>
          <View style={styles.split} />
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => askLogOut()} />
    </DrawerContentScrollView>
  );
}

const MyDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
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
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: windowHeight * 0.01
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
    borderColor: '#D3D3D3'
  }
})

export { MyDrawer };
