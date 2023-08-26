import React, { useEffect, useState, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../components/home/home';
import Login from '../../components/loginScreen/loginScreen';
import { MyDrawer } from './drawerNavigation';
import store from '../../config/store';

const RootStack = createStackNavigator();

const MyStack = () => {
  const [userToken, setUserToken] = useState(null)

  // const checkLogin = async () => {
  //   const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  //   try {
  //     // custom logic
  //     await sleep(2000);
  //     // const tokenn = null
  //     // setUserToken(tokenn);
  //   } finally {
  //     if (userToken === null) {
  //       console.log('Chua co token')
  //     } else if(userToken !== null) {
  //       let usrToken = store.getState().user.token
  //       setUserToken(usrToken)
  //     }
  //     console.log(userToken)
  //   }
  // }


  // useEffect(() => {
  //   console.log(userToken)
  //   checkLogin().catch(console.error)
  // }, [])

  // return (
  //   <RootStack.Navigator>

  //     <RootStack.Screen
  //       name="LoginScreen"
  //       component={Login}
  //       options={{
  //         headerBackVisible: false,
  //         headerShown: false,
  //       }}
  //     />
  //     <RootStack.Screen
  //       name="Home"
  //       component={MyDrawer}
  //       options={{
  //         headerBackVisible: false,
  //         headerShown: false,
  //       }}
  //     />
  //   </RootStack.Navigator>
  // );

  return (
    <RootStack.Navigator>
      {userToken == null ? (
        <RootStack.Screen
          name="LoginScreen"
          component={Login}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="Home"
          component={MyDrawer}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }}
        />
      )}
    </RootStack.Navigator>
  )

};

export default MyStack;


// function MyStack() {

//   <RootStack.Navigator>
//     <RootStack.Screen
//       name="Home"
//       component={MyDrawer}
//       options={{
//         headerBackVisible: false,
//         headerShown: false,
//       }}
//     />
//   </RootStack.Navigator>

// }
// export default MyStack