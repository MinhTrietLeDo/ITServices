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
import {
  Text,
  Center,
  Avatar,
  Heading
} from 'native-base'
import dynamicStyles from '../../assets/res/styles';
import { useTheme } from '../../assets/res/theming';

const Home = ({ navigation }) => {
  // const {theme, appearance} = useTheme()
  // const styles = dynamicStyles(theme, appearance)
  return (

    <Center>
      <View>
        <View>
          <Avatar
            style={{ height: 100, borderRadius: 50, width: 100, resizeMode: 'cover' }}
            source={{ uri: 'https://cdn.cwsplatform.com/assets/no-photo-available.png' }}
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginLeft: '10%' }}>
          {/* <Heading fontSize={30} bold>{this.props.userObj.glpifirstname + ' ' + this.props.userObj.glpirealname}</Heading> */}
          {/* <Text note>Last login in: {llfdata}</Text> */}
        </View>
      </View>
    </Center>
  );
};

export default Home;
