import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  //Text,
  StyleSheet,
  FlatList,
  BackHandler,
  //Alert,
  Image
} from 'react-native';
import useFocusEffect from '@react-navigation/native'
import store from '../../config/store';
import {
  Toast,
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Box,
  Text,
  Center,
  Collapse
} from 'native-base'

const Home = ({ navigation }) => {
  //const hasUnsavedChanges = Boolean(text);

  // useEffect(() =>
  //   navigation.addListener('beforeRemove', (e) => {
  //     // if (!hasUnsavedChanges) {
  //     //   // If we don't have unsaved changes, then we don't need to do anything
  //     //   return;
  //     // }

  //     // Prevent default behavior of leaving the screen
  //     e.preventDefault();

  //     // Prompt the user before leaving the screen
  //     Alert.alert(
  //       'Discard changes?',
  //       'You have unsaved changes. Are you sure to discard them and leave the screen?',
  //       [
  //         { text: "Don't leave", style: 'cancel', onPress: () => { } },
  //         {
  //           text: 'Discard',
  //           style: 'destructive',
  //           // If the user confirmed, then we dispatch the action we blocked earlier
  //           // This will continue the action that had triggered the removal of the screen
  //           onPress: () => navigation.dispatch(e.data.action),
  //         },
  //       ]
  //     );
  //   }),
  //   //[navigation, hasUnsavedChanges]
  //   []
  // );

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       { text: 'YES', onPress: () => BackHandler.exitApp() },
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  return (
    <Center>
      
    </Center>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Home;
